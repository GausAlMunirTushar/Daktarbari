import app from "./app/app.js";

const startServer = () => {
    const port = process.env.PORT || 4411; // Default port is 4411, can be overridden by environment variable

    app.listen(port, (err) => {
        if (err) {
            console.error("Error starting the server:", err.message);
            process.exit(1); // Exit the process with a non-zero code to indicate failure
        }
        console.log(`Server is running on port: ${port}`);
    });
};

startServer();
