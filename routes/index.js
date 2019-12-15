var express = require('express');
var router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const AWS = require("aws-sdk");

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2"
})

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
})


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sec', (req, res) => {
  res.render('sec');
})

router.post("/file", upload.array("file"), (req, res) => {
  const a = req.files;
  res.json({
    a: a
  })
})

module.exports = router;
