const express = require("express");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const router = express.Router();
router.use("/:postId/comments", require("./commentRouter"));

router.param("id", postController.checkId);
router
  .route("/")
  .get(
    authController.protect,
    postController.getAllPosts
  )
  .post(
    authController.protect,
    authController.restrict("admin", "writer"),
    postController.setWriter,
    postController.createPost
  );
router
  .route("/:id")
  .get(postController.getOnePost)
  .delete(
    authController.protect,
    authController.restrict("admin", "writer"),
    postController.deletePost
  )
  .patch(
    authController.protect,
    authController.restrict("admin", "writer"),
    postController.uploadImageCoverPost,
    postController.resizeImageCover,
    postController.updatePost
  );
module.exports = router;
