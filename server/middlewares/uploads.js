const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        const name = Buffer.from(Date.now() + '-' + Math.round(Math.random() * 1E9)).toString('base64') + path.extname(file.originalname)
        cb(null, name)
    }
})

module.exports = multer({ storage })