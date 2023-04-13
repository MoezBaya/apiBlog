const router= require("express").Router();
const { 
      getAllUserCtrl, 
      getUserProfileCtrl, 
      updateUserProfileCtrl, 
      getUsersCountCtrl,
      profilePhotoUploadCtrl,
      deleteUserProfileCtrl,
 } = require("../controllers/usersController");

 const { 
      verifyTokkenAndAdmin, 
      verifyTokkenAndOnlyUser,
      verifyToken, 
      verifyTokkenAndAuthorization
} = require("../middlewares/verifyToken");

const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");

// /api/users/profile
router.route("/profile").get(verifyTokkenAndAdmin, getAllUserCtrl);

// /api/users/profile/:id
router.route("/profile/:id")
      .get(validateObjectId, getUserProfileCtrl)
      .put(validateObjectId, verifyTokkenAndOnlyUser,updateUserProfileCtrl)
      .delete(validateObjectId, verifyTokkenAndAuthorization, deleteUserProfileCtrl);

// /api/users/profile/profile-photo-upload
router.route("/profile/profile-photo-upload")
      .post(verifyToken,photoUpload.single("image"), profilePhotoUploadCtrl)

// /api/users/count
router.route("/count").get(verifyTokkenAndAdmin, getUsersCountCtrl);

module.exports = router;