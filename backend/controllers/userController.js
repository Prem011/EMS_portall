const Login = require("../models/loginSchema")
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(Login.authenticate()));
const createTokenandSaveCookie = require("../jwt/generateToken");
const { error } = require("console");

exports.register =  async function(req, res, next){
    try{
        const {sno, username, password} = req.body;
        
        const existingUser = await Login.findOne({username});
        if(existingUser){
            return res.status(400).send({error: 'User already exists, Please change your username'});
        }

        if(!password){
            return res.status(400).send({error: 'Password is required'});
        }

        const newUser =  new Login({ username});
        await Login.register(newUser, password);

        
            const token = createTokenandSaveCookie(newUser._id, res);
            res.status(200).send({message: 'You have been registered successfully',
                user: {
                username: newUser.username,
                jwt: token
            }}); 
    

    }
    catch(err){
        console.log("Error in registering user: " + err);
            res.status(500).send({error: 'An error occurred while registering user, please try again'});
    }
}

exports.login = async function(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            // console.log("Error in login: " + err);
            return res.status(500).send({message: 'An error occurred while logging in, please try again'});
        }

        // console.log(user)

        if(!user) {
          
            if (info && info.message) {
                switch (info.message) {
                    case "Missing credentials":
                        message = "Please provide both username and password.";
                        break;
                    case "Incorrect password":
                        message = "The password you entered is incorrect.";
                        break;
                    case "No user found with this Username":
                        message = "No account found with this username.";
                        break;
                    default:
                        message = "Authentication failed due to unknown reasons.";
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
        // console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
  };