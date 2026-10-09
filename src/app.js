const express = require("express");
const cookieParser = require("cookie-parser")

require("./jobs/cronJobs");

const app = express();

app.use(express.json())
app.use(cookieParser())

/**
 * -Routes required here
 */
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")


/**
 * - use routes
 */
app.use("/api/auth",authRouter)
app.use("api/account",accountRouter)

module.exports = app;