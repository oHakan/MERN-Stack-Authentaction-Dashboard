const fs = require('fs');

module.exports = async function (req, res ,next) {
    try {
         if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: "Yüklenecek dosya bulunamadı"})
         const file = req.files.file;

         console.log(file)
         if(file.size > 1024 * 1024) {
             removeTmp(file.temp)
             return res.status(400).json({msg: "Fotoğraf moyutu maksimum 1 MB olmalıdır"})

         }

         if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
             removeTmp(file.tempFilePath)
             return res.status(400).json({msg: "Fotoğraflar sadece jpg ve png uzantılı olmalıdır."})
         }

         next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}