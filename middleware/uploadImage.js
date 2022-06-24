import multer from 'multer'

export default (multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/uploads')
        },
        filename: (req, file, callback) => {
            callback(null, Date.now().toString + "_" + file.originalname)
        }
    }),
    fileFilter: (req, file, callback) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype)
        if(extensaoImg){
            return callback(null, true)
        }else{
            return callback(null, false)
        }
    }
}))