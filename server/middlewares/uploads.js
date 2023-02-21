const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uplaods')
    },
    filename: function (req, file, cb) {
        const name = Buffer.from(Date.now() + '-' + Math.round(Math.random() * 1E9)).toString('base64') + path.extname(file)
        req.filename = name;
        cb(null, name)
    }
})

module.exports = multer({ storage })