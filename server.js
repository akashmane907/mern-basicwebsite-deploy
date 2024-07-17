require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');

const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');
const connectDb= require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");

//cors middleware
const corsOptions = {
  origin: 'http://localhost:5173', // specify the origin of the client
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // specify the HTTP methods allowed
  credentials: true, // allow credentials (like cookies) to be sent
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth",authRoute);

app.use("/api/form", contactRoute);
app.use("/api/data",serviceRoute);
app.use(errorMiddleware);

//lets get admin routes
app.use("/api/admin",adminRoute);
//
app.get("/",(req,res)=> {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});



// app.get('/', (req, res) => {
//   res.status(200).send('Welcome to My website!');
// });
// app.get('/contact', (req, res) => {
//     res.status(200).send('this is my contact');
//   });

connectDb().then(() =>{

  app.listen(3000, () => {
    console.log('server is running on 3000!');
  });

});

