import dotenv from "dotenv";
dotenv.config();

import { URL } from "url";
import express from "express";
import app from "./app.js";
import connectDB from "./db/connectDB.js";

// * *************** The environment should set the port ***************
const port = process.env.PORT;
if (port == null) {
  // Make sure `.env` files are created in the right place with the PORT set.
  console.error(new Error("PORT number not found. Please setup .env files."));
  process.exit(1); // Exit the process if PORT is not defined
}

// * *************** Start Server and Connect to Database ***************
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, (err) => {
      if (err) {
        console.error(`\n\u001b[1;31mFailed to start server: ${err}\u001b[0m`);
        process.exit(1); // Exit the process if the server fails to start
      } else {
        console.log(
          `\n\u001b[1mServer\u001b[22m started on port \n\u001b[36mhttp://localhost:\u001b[1m${port}\u001b[22m/api/\u001b[0m`
        );
      }
    });
  } catch (error) {
    console.error(
      `\n\u001b[1;31mError connecting to the database: ${error}\u001b[0m`
    );
    process.exit(1); // Exit the process if error is encountered
  }
};

// * *************** Host our client code for Heroku ***************
/* We only want to host our client code when in production mode as we then want to use the production build that is built in the dist folder. When not in production, don't host the files, but the development version of the app can connect to the backend itself. */
// * Serve static files and handle client-side routing in production mode
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(new URL("../../client/dist", import.meta.url).pathname)
  );
  // Redirect * requests to give the client data
  app.get("*", (req, res) =>
    res.sendFile(
      new URL("../../client/dist/index.html", import.meta.url).pathname
    )
  );
}

// * Start the server
startServer();
