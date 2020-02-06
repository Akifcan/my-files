const FileController = require('./FileController')
const router = require('express').Router()
const path = require('path')

const multer = require('multer')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let folderName = req.headers.foldername
		let uploadPath = folderName == 'Ana Dizin' ? './uploads/files' : `./uploads/files/${folderName}`
		cb(null, uploadPath)
	},
	filename: (req, file, cb) => {
		const filename = file.originalname.split('.')[0] //resim.png  -> resim [0] , png [1]
		cb(null, filename+Date.now()+path.extname(file.originalname))
	}
})

const upload = multer({storage})

router.get('/', FileController.get_all)
router.get('/file-count', FileController.file_count)
router.get('/:folderName', FileController.get_by_folder_name)
router.get('/file-size/:folderName', FileController.get_file_size)

router.post('/upload', upload.single('file'), FileController.upload)
router.post('/delete', FileController.delete_file)


module.exports = router