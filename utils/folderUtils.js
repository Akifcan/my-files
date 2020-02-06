const { UPLOAD_URL } = require('../config')
const fs = require('fs')


const getFolders = () => {
	return new Promise(function(resolve, reject){
		let folders = []
		fs.readdir(UPLOAD_URL, (err, items) => {
			items.forEach(item => {
				let stat = fs.lstatSync(`${UPLOAD_URL}/${item}`).isDirectory()
				if(stat){
					folders.push(item)
				}
			})
			if(err){
				return reject(err)
			}
			return resolve(folders)
		})
	})
}

const createFolder = folderName => {
	return new Promise(function(resolve, reject){
		if(fs.existsSync(`${UPLOAD_URL}/${folderName}`)){
			resolve(false)
		}else{
			console.log('OK')
			fs.mkdirSync(`${UPLOAD_URL}/${folderName}`)
			resolve(true)
		}
	})

}

module.exports= {
	getFolders, createFolder
}