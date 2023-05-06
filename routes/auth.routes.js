const { Router } = require("express");
const authController = require("../controller/authController");
const authenticateJWT = require("../middleware/authenticateJWT");

const router = Router();

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/registration", authController.register);
router.post("/login", authController.login);
router.post("/refreshtoken", authenticateJWT, authController.refreshToken);

module.exports = router;
