import DocumentosDAO from "../dao/DocumentosDAO.js";

export default class DocumentosCtrl{
    static async apiFindMyDocs(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const cpf = req.body.cpf
            const docResponse = await DocumentosDAO.findMyDocs(cpf, page)
            res.json(docResponse)
        }catch(e){
            res.status(500).json({erro: e.message})
        }

    }

    static async apiAddDoc(req, res){
        try{
            const remetente = req.body.remetente
            const cpf = req.body.cpf
            const filialRemetente = req.body.filialRemetente
            const remetenteSetor = req.body.setorRemetente
            const destinatario = req.body.destinatario
            const setorDestinatario = req.body.setorDestinatario
            const numero = req.body.numero
            const assunto = req.body.assunto
            const conteudo = req.body.conteudo
            const data = req.body.data
            const classe = req.body.classe
            const enderecoRemetente = req.body.enderecoRemetente
            const imgRemetente = req.body.imgRemetente
            const docResponse = await DocumentosDAO.addDoc(
                remetente,
                cpf,
                filialRemetente,
                remetenteSetor,
                destinatario,
                setorDestinatario,
                numero,
                assunto,
                conteudo,
                data,
                classe,
                enderecoRemetente,
                imgRemetente
            )
            res.json({status: 'success'})
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiFindDocBySetor(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const aba = req.body.classe
            const setor = req.body.setor
            const filial = req.body.filial
            const docResponse = await DocumentosDAO.findDocBySetor(setor, filial, aba, page)
            res.json(docResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiFindLastNum(req, res){
        try{
            const classe = req.body.classe
            const docResponse = await DocumentosDAO.findLastNum(classe)
            res.json(docResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUploadFile(req, res){
        try{
            const reqFiles = []
            const remetente = req.body.remetente
            const cpf = req.body.cpf
            const filialRemetente = req.body.filialRemetente
            const setorRemetente = req.body.setorRemetente
            const destinatario = req.body.destinatario
            const setorDestinatario = req.body.setorDestinatario
            const numero = null
            const assunto = req.body.assunto
            const conteudo = req.body.conteudo
            const data = req.body.data
            const classe = req.body.classe
            const enderecoRemetente = null
            const imgRemetente = null
            const url = 'http://localhost:8080'
            for(var i = 0; i < req.files.length; i++){
                reqFiles.push(url + '/public/assets/pdf/' + req.files[i].filename)
                const docResponse = await DocumentosDAO.uploadFile(
                    remetente,
                    cpf,
                    filialRemetente,
                    setorRemetente,
                    destinatario,
                    setorDestinatario,
                    numero,
                    assunto,
                    conteudo,
                    data,
                    classe,
                    enderecoRemetente,
                    imgRemetente,
                    reqFiles[i])
            }
            
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
        
    }

    static async apiFindDocById(req, res){
        try{
            const id = req.body._id;
            const docResponse = await DocumentosDAO.findDocById(id)
            res.json(docResponse)
        }catch(e){
            res.status(500).json({error: e.message});
        }
    }


}