const router = require('express').Router();
const userRouter = require('./user.route');
const habitRouter = require('./habit.route');

router.get('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message": "Hello from express!"}');
});

router.use('/user', userRouter);
router.use('/habit', habitRouter);

/* 
router.use("/portfolios", portfolioRouter);

router.use("/upload", uploadRouter);

router.use("/pages", pageRouter);

router.use("/artifacts", artifactRouter);

router.use("/contact", contactRouter);

router.use("/media", mediaRouter);

router.use("/resetpassword", resetPassRouter); */

module.exports = router;
