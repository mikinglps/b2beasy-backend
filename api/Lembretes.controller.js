import LembretesDAO from "../dao/LembretesDAO.js";

export default class LembretesCtrl{
    static async apiAddLembrete(req, res){
        try{
            const titulo = req.body.titulo
            const descricao = req.body.descricao
            const data = req.body.data
            const horario = req.body.horario
            const cpf = req.body.cpf
            const lembreteResponse = await LembretesDAO.addLembrete(
                titulo,
                descricao,
                data,
                horario,
                cpf
            )
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({erro: e})
        }
    }

    static async apiFindMyLembretes(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const cpf = req.body.cpf
            const lembreteResponse = await LembretesDAO.findMyLembretes(cpf, page)
            res.json(lembreteResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindMyLembretesSidebar(req, res){
        try{
            const cpf = req.body.cpf
            const lembreteResponse = await LembretesDAO.findMyLembretesSidebar(cpf)
            res.json(lembreteResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiDeleteLembrete(req, res){
        try{
        const id = req.body._id
        const lembreteResponse = await LembretesDAO.deleteLembrete(id)
        res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e})
        }
    }
}