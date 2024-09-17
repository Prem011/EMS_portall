const Login = require("../models/loginSchema")
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(Login.authenticate()));
const createTokenandSaveCookie = require("../jwt/generateToken");
const { error } = require("console");

exports.register =  async function(req, res, next){
    try{
        const {sno, username, password} = req.body;
        
        // for checking if the user already exists
        const existingUser = await Login.findOne({username});
        if(existingUser){
            return res.status(400).send({error: 'User already exists, Please change your username'});
        }

        //validate password
        if(!password){
            return res.status(400).send({error: 'Password is required'});
        }

        //create new user
        const newUser =  new Login({ username});
        await Login.register(newUser, password);

        
        // if(newUser){
            const token = createTokenandSaveCookie(newUser._id, res);
            res.status(200).send({message: 'You have been registered successfully',
                user: {
                username: newUser.username,
                jwt: token
            }}); 
        // } 
    

    }
    catch(err){
        console.log("Error in registering user: " + err);
        // if(!res.headersSent){
            res.status(500).send({error: 'An error occurred while registering user, please try again'});
        // }   
    }
}

exports.login = async function(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.log("Error in login: " + err);
            return res.status(500).send({message: 'An error occurred while logging in, please try again'});
        }

        console.log(user)

        if(!user) {
            let message = "Invalid email or password"; // Default error message
          
          // Check the info object for specific error messages from Passport
          if (info && info.message) {
              if (info.mesesage === "Missing credentials") {
                  console.log(info.message);
                  message = "Please provide both username and password.";
              } else if (info.message === "Incorrect password") {
                  console.log(info.message);
                  message = "The password you entered is incorrect.";
              } else if (info.message === "No user found with this Username") {
                  console.log(info.message);
                  message = "No account found with this username.";
              }
          }

          return res.status(401).json({ error: message });
        }


        req.login(user, (err) => {
            if(err) {
                console.log("Error in login: " + err);
                return res.status(500).send({error: 'An error occurred while logging in, please try again'});
            }

            const token = createTokenandSaveCookie(user._id, res);

            // const username = localStorage.setItem('EMS', JSON.stringify(user.username))

            return res.status(200).json({message: 'Login successful',
                user: {
                    username: user.username,
                    token: token



                }});


        });
    })(req, res, next);
};

exports.logout = function(req, res) {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User Logged out!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
  };