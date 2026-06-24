import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "20kb" }))
app.use(express.static("public"))


import userRoute from './routes/user.route.js'
import listRoute from './routes/list.route.js'
app.use("/user", userRoute)
app.use("/list", listRoute)



app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err)
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        ...err
    });
});

export { app }