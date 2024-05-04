import app from "./app.js";

const startServer = () => {
    let port = 4411
    app.listen(port, () => {
        console.log(`server running on port: ${port}`);
    });
};

startServer();
