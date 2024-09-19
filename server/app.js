const express = require("express");
const app = express()
const productsRouter = require("./routes/products");
const loginRouter = require("./routes/auth");
const ordersRouter = require("./routes/orders");
const commentsRouter = require("./routes/comments");
const categoriesRouter = require("./routes/categories");
const errorHandlerMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 5000;
const cors = require('cors')
const connectDB = require("./db/connect");
// const connectDB = require("./db/connect");
require("dotenv").config()
app.use(express.json())
// Define CORS options
const corsOptions = {
    origin: '*', // Replace with your front-end URL
    // origin: 'http://localhost:4200',
    methods: ['GET', "HEAD", 'POST', 'PATCH', 'PUT', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}
// cors
app.use(cors(corsOptions))

app.options("/api/v1/products", cors(corsOptions)); // Enable pre-flight for all routes
app.options("/api/v1/orders", cors(corsOptions)); // Enable pre-flight for all routes
app.options("/api/v1/auth", cors(corsOptions)); // Enable pre-flight for all routes
app.options("/api/v1/comments", cors(corsOptions)); // Enable pre-flight for all routes

// routes
app.use("/api/v1/products", productsRouter)
app.use("/api/v1/orders", ordersRouter)
app.use("/api/v1/auth", loginRouter)
app.use("/api/v1/comments", commentsRouter)
app.use("/api/v1/categories", categoriesRouter)
app.use("/uploads", express.static("uploads"))
app.use(errorHandlerMiddleware)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)      
        .then(()=> console.log("Connected to DB"))
        .catch((err)=> console.log(err))
        app.listen(port, () => console.log(`Listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()

