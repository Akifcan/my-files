const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { PORT, CONNECTION_STRING } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/uploads/', express.static(__dirname+'/uploads'))

app.use('/files/', require('./modules/files/FileRouter'))
app.use('/folders/', require('./modules/folders/FolderRouter'))


mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(connected => {
	app.listen(PORT, () => console.log(`Working on ${PORT}`))
})
