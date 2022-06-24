import DocumentosCtrl from "./Documentos.controller.js"
import express from 'express'
import multer from 'multer'
const documentos = express.Router()
const date = new Date()
let save = date.getTime()+date.getSeconds()+date.getMilliseconds()
const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/assets/pdf')
        },
        filename: (req, file, callback) => {
            callback(null, save+"_"+file.originalname.toLowerCase().split(' ').join('-'))
        }
    })
const fileFilter = (req, file, callback) => {
    if(file.mimetype == 'application/pdf'){
        callback(null, true)
    }else{
        callback('Selecione um documento PDF. Erro no formato.', false)
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })
documentos.post('/upload', upload.array('pdfCollection'), DocumentosCtrl.apiUploadFile)
documentos.route('/find').post(DocumentosCtrl.apiFindMyDocs)
documentos.route('/').post(DocumentosCtrl.apiAddDoc)
documentos.route('/setor').post(DocumentosCtrl.apiFindDocBySetor)
documentos.route('/id').post(DocumentosCtrl.apiFindDocById)
documentos.route('/oficio').post(DocumentosCtrl.apiFindLastNum)
export default documentos