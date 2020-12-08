const router = require("express").Router();

/* const userRouter = require("./user.route");
const portfolioRouter = require("./portfolio.route");
const uploadRouter = require("./upload.route");
const pageRouter = require("./page.route");
const artifactRouter = require("./artifact.route");
const contactRouter = require("./contact.route");
const mediaRouter = require("./media.route");
const userController = require("../controllers/user.controller");
const resetPassRouter = require("./resetPass.route"); */

// router.get("/users", userController.getAllUsers);

router.get("/", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send('{"message": "Hello from express!"}');
});

const userRouter = require("./user.route");
const habitRouter = require("./habit.route");

router.use("/user", userRouter);
router.use("/habit", habitRouter);


/* 
router.use("/portfolios", portfolioRouter);

router.use("/upload", uploadRouter);

router.use("/pages", pageRouter);

router.use("/artifacts", artifactRouter);

router.use("/contact", contactRouter);

router.use("/media", mediaRouter);

router.use("/resetpassword", resetPassRouter); */

module.exports = router;