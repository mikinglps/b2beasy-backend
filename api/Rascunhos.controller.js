import RascunhosDAO from "../dao/RascunhosDAO.js";

export default class RascunhosCtrl{
    static async apiAddRascunho(req, res){
        try{
            const remetente = req.body.remetente
            const cpf = req.body.cpf
            const filialRemetente = req.body.filialRemetente
            const remetenteSetor = req.body.setorRemetente
            const destinatario = req.body.destinatario
            const setorDestinatario = req.body.setorDestinatario
            const memoNum = req.body.memoNum
            const assunto = req.body.assunto
            const conteudo = req.body.conteudo
            const data = req.body.data
            const classe = req.body.classe
            const enderecoRemetente = req.body.enderecoRemetente
            const imgRemetente = req.body.imgRemetente
            const rascunhoResponse = await RascunhosDAO.addRascunho(
                remetente,
                cpf,
                filialRemetente,
                remetenteSetor,
                destinatario,
                setorDestinatario,
                memoNum,
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

    static async apiFindMyRascunhos(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const cpf = req.body.cpf;
            const rascunhoResponse = await RascunhosDAO.findMyRascunhos(cpf, page)
            res.json(rascunhoResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiFindRascunhoById(req, res){
        try{
            const id = req.body._id
            const rascunhoResponse = await RascunhosDAO.findRascunhoById(id)
            res.json(rascunhoResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}