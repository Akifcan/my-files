const fs = require('fs')
const filesize = require('filesize')

const path = 'C:\\Users\\user\\Desktop\\my-files\\server\\uploads\\files\\' 


fs.readdir(path, function(err, items) {
	let total = 0
	items.forEach(item => {
		let stat = fs.lstatSync(`${path}/${item}`)
		if(stat.isFile()){
			total += parseFloat(filesize(stat.size, {round: 0}))
		}
	})
	console.log(bytesToSize(total))
})

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}
//https://gist.github.com/lanqy/5193417