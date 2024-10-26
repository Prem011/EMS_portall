require("dotenv").config({ path: "./.env" });
const express = require('express');
const morgan = require('morgan');
const userRouter = require("./routes/userRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const attendenceRoutes = require("./routes/attendenceRoutes");
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Login = require("./models/loginSchema");

const db = require("./models/dbConfig");
const path = require("path");

const app = express();

// app.use(cors());
app.use(cors({
    // origin: 'http://localhost:5173', // Allow requests from this specific origin
    origin: 'https://ems-portall.onrender.com', // Allow requests from this specific origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if needed
    credentials: true // Allow cookies if required
  }));

app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(Login.serializeUser());
passport.deserializeUser(Login.deserializeUser());

app.use("/user", userRouter); // user
app.use("/employees", employeeRouter); // employees
app.use("/payroll", payrollRoutes); // payroll
app.use("/attendence", attendenceRoutes); // attendence

//code for deployment
if(process.env.NODE_ENV !== 'production'){
    const dirPath = path.resolve();

    app.use(express.static('./frontend/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(dirPath, './frontend/dist', 'index.html'));
    })
}

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running at ${PORT}`);
// });
app.listen(PORT, () => {
    console.log(`Server is running`);
});
