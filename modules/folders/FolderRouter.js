const router = require('express').Router()
const FolderController = require('./FolderController')

router.get('/', FolderController.folders)
router.post('/', FolderController.create_folder)

module.exports = router