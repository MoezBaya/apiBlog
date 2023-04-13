const router = require("express").Router();
const {
    createPostCtrl, 
    getAllPostsCtrl, 
    getSinglePostCtrl, 
    getPostCountCtrl, 
    deletePostCtrl, 
    updatePostCtrl, 
    updatePostImageCtrl, 
    toggleLikeCtrl
} = require("../controllers/postsController")
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");
const validObjectId = require("../middlewares/validateObjectId");

// /api/posts
router
    .route("/")
    .post(verifyToken, photoUpload.single("image"), createPostCtrl)
    .get(getAllPostsCtrl)

// /api/posts/count
router.route("/count").get(getPostCountCtrl);

// /api/posts/:id
router
    .route("/:id")
    .get(validObjectId, getSinglePostCtrl)
    .delete(validObjectId, verifyToken, deletePostCtrl)
    .put(validObjectId, verifyToken, updatePostCtrl)

// /api/posts/update-image/:id
router.route("/update-image/:id")
      .put(validObjectId, verifyToken, photoUpload.single("image"), updatePostImageCtrl)

// /api/posts/like/:id
router.route("/like/:id").put(validObjectId, verifyToken, toggleLikeCtrl)

module.exports = router;