const express = require('express');
const router = express.Router();
const categoriesController = require("../Controllers/categories")

router.get('/',categoriesController.index )

router.get('/:id', categoriesController.finding)

router.post('/', categoriesController.creatingCategory)

router.put('/:id', categoriesController.UpdateCategory)

router.delete('/:id', categoriesController.DeleteCategory)

module.exports = router;