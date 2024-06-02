const authController = require("../controllers/authController");
const commentController = require("../controllers/commentController");
const express = require("express");
const router = express.Router({ mergeParams: true });
router.use(authController.protect);
router
  .route("/")
  .get(commentController.getAllComments)
  .post(
    authController.restrict("user", "admin"),
    commentController.setUserIdAndPostId,
    commentController.createComment
  );
router
  .route("/:id")
  .get(commentController.getOneComment)
  .patch(authController.restrict('admin'),commentController.updateComment)
  .delete(authController.restrict( "admin"),commentController.deleteComment);
module.exports = router;
