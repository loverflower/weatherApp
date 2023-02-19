const userController = require("../controllers/user-controller");

const Router = require("express").Router;
const { body } = require("express-validator");
const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 20 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.post("/options", userController.setOptions);
router.get("/options/:id", userController.getOptions);
router.delete("/options/:id", userController.deleteOptions);

// router.post("/user", userController.createUser);
// router.get("/user", userController.getUsers);
// router.get("/user/:id", userController.getOneUser);
// router.put("/user", userController.updateUser);
// router.delete("/user/:id", userController.deleteUser);

module.exports = router;
