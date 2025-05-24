import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage engine
const storage = multer.diskStorage({
  filename:function (req, file, callback){
    callback(null, file.originalname)
  }
});

const upload = multer({ storage });

export default upload;
