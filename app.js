require("dotenv").config({ path: "./.env"});
const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const authenticate = require("./authenticate");

const indexRouter = require("./routes/index");
const dashboardRouter = require("./routes/dashboard");
const merchRouter = require("./routes/merchandise");
const usersViewRouter = require("./routes/blog");
const uploadRouter = require("./routes/upload");
const createMerchRouter = require("./routes/createMerch");
const detailsRouter = require("./routes/merchdetails");
const blogDetailsRouter = require("./routes/blogDetails");
const createBlogRouter = require("./routes/createBlogger");
const loginRouter = require("./routes/login");

const app = express();

mongoose.connect("mongodb://localhost:27017/images").then(
	() => console.log("Connected to database safely"),
	(err) => console.log(err)
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({
	secret: process.env.SESSION_ID,
	resave: false,
	saveUninitialized: true,
  cookie: {
    sameSite: 'lax',
  }
}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticate.initialize);
app.use(authenticate.session);

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/dashboard", dashboardRouter);
app.use("/merchandise", merchRouter);
app.use("/blog", usersViewRouter);
app.use("/upload", uploadRouter);
app.use("/createmerch", createMerchRouter);
app.use("/merchandise", detailsRouter);
app.use("/dashboard", blogDetailsRouter);
app.use("/createBlogger", createBlogRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error", { message: res.locals.message, status: res.status });
});

module.exports = app;
