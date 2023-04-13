const router = require("express").Router();
const { verifyTokkenAndAdmin } = require("../middlewares/verifyToken");
const { 
      createCategoryCtrl, 
      getAllCategoriesCtrl, 
      deleteCategoriesCtrl
} = require("../controllers/categoriesController");
const validateObjectId = require("../middlewares/validateObjectId")

// /api/categories
router.route("/")
      .post(verifyTokkenAndAdmin, createCategoryCtrl)
      .get(getAllCategoriesCtrl);

// /api/categories/:id
router.route("/:id").delete(validateObjectId, verifyTokkenAndAdmin, deleteCategoriesCtrl)

module.exports = router ;