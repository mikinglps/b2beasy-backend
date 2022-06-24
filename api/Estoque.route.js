import express from "express";
import EstoqueCtrl from "./Estoque.controller.js";
import multer from 'multer'
const date = new Date()
let save = date.getTime()+date.getSeconds()+date.getMilliseconds()
const estoque = express.Router();

const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/assets/images')
        },
        filename: (req, file, callback) => {
            callback(null, save+"_"+file.originalname.toLowerCase().split(' ').join('-'))
        }
    })

const fileFilter = (req, file, callback) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype =='image/jpg' || file.mimetype == 'image/png'){
        callback(null, true)
    }else{
        callback('Selecione uma imagem valida. Erro no formato.', false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

estoque.post('/add', upload.single('imagem'), EstoqueCtrl.apiAddItem)
estoque.route('/').get(EstoqueCtrl.apiFindItem)
estoque.route('/missing').get(EstoqueCtrl.apiFindMissing)
estoque.route('/quantidade').post(EstoqueCtrl.apiEditQuantidade)
estoque.route('/delete').post(EstoqueCtrl.apiDeleteOne)
estoque.route('/id').post(EstoqueCtrl.apiFindItemById)
estoque.route('/edit/id').post(EstoqueCtrl.apiUpdateItem)

export default estoque