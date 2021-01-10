const router = require('express').Router(); 
const multer = require('multer'); 
const crypto = require('crypto'); 
const path = require('path'); 
const GridFsStorage = require('multer-gridfs-storage'); 
const uri = process.env.ATLAS_URI;

//for file upload
const storage = new GridFsStorage({   
  url: uri, 
  file: (req, file) => { 
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if(err){ 
          return reject(err); 
        }
        const filename = buf.toString('hex') + path.extname(file.originalname); 
        const fileInfo = { 
          filename: filename, 
          bucketName: 'uploads'
        }
        resolve(fileInfo); 
      })
    })
  }
}); 

const upload = multer({ storage }); 

router.route('/upload').post(upload.single('file'), (req, res) => { 
    res.json({file:req.file}); 
}); 

module.exports = router; 