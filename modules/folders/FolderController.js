const fs = require('fs')
const { UPLOAD_URL } = require('../../config')
const { getFolders, createFolder } = require('../../utils/folderUtils')

/*
	@route: GET /folders/
	@description: get all folders
*/
exports.folders = (req, res) => {
	getFolders()
	.then(folders => {
		res.send(folders)
	})
}

/*
	@route: POST /folders/
	@description: create new folder if not exists
*/
exports.create_folder = (req, res) => {
	const folderName = req.body.folderName
	if(folderName != null){
		createFolder(folderName)
		.then(resposne => {
			if(resposne){
				res.status(200).json({
					message: 'Your folder created',
					folderName,
					path: `${UPLOAD_URL}/${folderName}`
				})
			}else{
				res.status(201).json({
					message: 'This folder already exists',
					folderName,
					path: `${UPLOAD_URL}/${folderName}`
				})
			}
		})
	}else{
		res.status(202).json({
			message: 'Please enter folder name'
		})
	}
}