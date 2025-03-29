import express, { Application } from "express";

const app: Application = express();
app.listen(3030, () => {
    console.log('Server running on port 3030');
});