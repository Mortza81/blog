const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router
  .route("/")
  .get(
    authController.protect,
    authController.restrict("admin"),
    userController.getAllUsers
  );
router.post("/signup", authController.signup);
router.delete("/deleteMe", authController.protect, userController.deleteMe);
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updateMyPassword
);
router.delete(
  "/deleteMyComment/:id",
  authController.protect,
  commentController.deleteMyComment
);
router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserPhoto,
  userController.updateMe
);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrict("admin"),
    userController.getOneUser
  )
  .patch(
    authController.protect,
    authController.restrict("admin"),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrict("admin"),
    userController.deleteUser
  );
module.exports = router;
