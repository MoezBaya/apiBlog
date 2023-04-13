const router = require("express").Router();
const { 
      verifyToken, 
      verifyTokkenAndAdmin 
} = require("../middlewares/verifyToken");
const {
      createCommentCtrl, 
      getAllCommentCtrl, 
      deleteCommentCtrl, 
      updateCommentCtrl
} = require("../controllers/commentsController")
const validateObjectId = require("../middlewares/validateObjectId")

// /api/comments
router.route("/")
      .post(verifyToken, createCommentCtrl)
      .get(verifyTokkenAndAdmin, getAllCommentCtrl);

// /api/comments/:id
router.route("/:id")
      .delete(validateObjectId, verifyToken, deleteCommentCtrl)
      .put(validateObjectId, verifyToken, updateCommentCtrl);

module.exports= router;