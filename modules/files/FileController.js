const FileModel = require('./FileModel')
const { BASE_URL } = require('../../config')
const getFileSize = require('../../utils/getFileSize')


const fs = require('fs')


/*
	@route: GET /files/
	@description: get files from main path
*/
exports.get_all = (req, res) => {
	FileModel.find({folderName: 'Ana Dizin'})
	.then(files => {
		res.status(200).json({
			files
		})
	})
	.catch(error => {
		res.status(400).json({
			message: 'error',
			error: error,
			mongoose: error.errmsg
		})
	})
}

/*
	@route: GET /files/:folderName
	@description: get files from where query
*/
exports.get_by_folder_name = (req, res) => {
	const folderName = req.params.folderName
	FileModel.find({folderName})
	.then(files => {
		getFileSize(folderName)
		.then(size => {
			res.status(200).json({
				files, size: size == 'NaN undefined' ? 'File not found': size
			})
		})
	})
	.catch(error => {
		res.status(400).json({
			message: 'error',
			error: error,
			mongoose: error.errmsg
		})
})}

/*
	@route: GET /files/file-size/:param
	@description: get file size
*/
exports.get_file_size = (req, res) => {
	const folderName = req.params.folderName
	getFileSize(folderName)
	.then(size => {
		res.status(200).json({
			size: size == 'Nan Undefined' ? 'File not found': size
		})
	})
}



/*
	@route: POST /files/upload
	@description: upload file
*/
exports.upload = (req, res) => {

	const title = req.headers.title
	const folderName = req.headers.foldername
	const fileUrl = folderName == 'Ana Dizin' ? `/uploads/files/${req.file.filename}` : `/uploads/files/${folderName}/${req.file.filename}`
	const fileType = req.file.mimetype

	const newFile = new FileModel({
		title, fileUrl, fileType, folderName
	})
	newFile.save()
	.then(response => {
		res.status(200).json({
			message: 'File uploaded succesffully',
			id: response._id,
			response
		})
	})
	.catch(error => {
		res.status(400).json({
			message: 'Error',
			error: error,
			mongoose: error.errmsg
		})
	})

}

/*
	@route: POST /files/file-count
	@description: mimetype groups
*/
exports.file_count = (req, res) => {
	const agg = [
		{
			$group: {
				_id: '$fileType',
				total: {$sum: 1}
			}
		}
	]
	FileModel.aggregate(agg)
	.then(response => {
		res.status(200).json(
			response
		)
	})
}

/*
	@route: POST /files/delete
	@description: delete folder
*/
exports.delete_file = (req, res) => {
	const path = BASE_URL+req.body.path
	const id = req.body.id

	fs.unlink(path, (err) => {
		if(err){
			console.log(err)
			return
		}
		console.log('OK')
		FileModel.deleteOne({_id: id})
		.then(response => {
			res.status(200).json({
				message: 'Your file removed successfully',
				subtitle: `Deleted from ${path}`
			})
		})
	})

}




