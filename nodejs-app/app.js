import dotenv from "dotenv";
import express from "express";
import nodeCleanup from "node-cleanup";
import routes from "./routes.js";
import { init, cleanup } from "./whatsapp.js";
import cors from "cors";

dotenv.config();
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const app = express();

const host = process.env.WA_SERVER_HOST || undefined;
const port = process.env.WA_SERVER_PORT || 8000;

console.log(process.env.MAX_RETRIES);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use("/", routes);

//#region

// Catch 404 and Forward to Error Handler
app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error); // Forward to the global error handler
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  // Respond with the error status and message
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

const gracefulRestart = () => {
  console.log("Attempting to restart the server gracefully...");

  // Close the server to stop accepting new connections
  server.close(async () => {
    console.log("Server shut down. Restarting...");
    nodeCleanup(cleanup);
    process.exit(0); // Exit the process gracefully
  });

  // If the server doesn't close within 10 seconds, forcefully shut it down
  setTimeout(() => {
    console.error("Forcing shutdown due to timeout...");
    process.exit(1);
  }, 10000); // 10 seconds timeout
};
//#endregion

const listenerCallback = () => {
  init();
  console.log(
    `Server is listening on http://${host ? host : "localhost"}:${port}`
  );
};
let server;
if (host) {
  server = app.listen(port, host, listenerCallback);
} else {
  server = app.listen(port, listenerCallback);
}

nodeCleanup(cleanup);

export default app;

// Catch Unhandled Promise Rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  gracefulRestart();
});

// Catch Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  gracefulRestart();
});
