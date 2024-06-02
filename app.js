const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const path = require("path");
const appError = require("./utils/appErrors");
const helmet = require("helmet");
const xss = require("xss-clean");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(xss());
app.use("/", require("./router/viewRouter"));
app.use("/api/v1/comments", require("./router/commentRouter"));
app.use("/api/v1/posts", require("./router/postRouter"));
app.use("/api/v1/users", require("./router/userRouter"));
app.use("*", (req, res, next) => {
  next(new appError(`${req.originalUrl} not found`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
