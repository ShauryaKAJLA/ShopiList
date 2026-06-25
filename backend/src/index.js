import connectDB from './db/index.js';
import { app } from './app.js';



connectDB()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is listening at : http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log("Mongo db connection failed: ", error?.message)
    })