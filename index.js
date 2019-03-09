const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

// Init middleware
app.use(logger);

// handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// use body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// homepage route for handlebars template engine
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member Page Bro",
    members
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
