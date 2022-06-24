import FiliaisDAO from "../dao/FiliaisDAO.js";

export default class FiliaisCtrl{
    static async apiAddFilial(req, res){
        try{
            const titulo = req.body.titulo
            const cnpj = req.body.cnpj
            const memo = req.body.memo
            const FilialResponse = await FiliaisDAO.addFilial(titulo, cnpj, memo)
            res.json(FilialResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiFindFilialNoPage(req, res){
        try{
        const FilialResponse = await FiliaisDAO.findFilialNoPage()
        res.json(FilialResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindAllFiliais(req, res){
        
        try{
        const page = parseInt(req.query.page) || 1
        const FilialResponse = await FiliaisDAO.findAllFiliais(page)
        res.json(FilialResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiFindSelectedFilial(req, res){
        try{
            const titulo = req.body.titulo
            const FilialResponse = await FiliaisDAO.findSelectedFilial(titulo)
            res.json(FilialResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiEditMemo(req, res){
        try{
            const id = req.body._id
            const memo = req.body.memo
            const FilialResponse = await FiliaisDAO.editMemo(id, memo)
            console.log(req)
            res.json({status: 'success'})
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiFindMyFilial(req, res){
        try{
            const id = req.body._id
            const FilialResponse = await FiliaisDAO.findMyFilial(id)
            res.json(FilialResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiDeleteFilial(req, res){
        try{
            const id = req.body._id
            const FilialResponse = await FiliaisDAO.deleteFilialById(id)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiEditFilial(req, res){
        try{
            const id = req.body._id
            const titulo = req.body.titulo
            const cnpj = req.body.cnpj
            const memo = req.body.num
            const endereco = req.body.endereco
            const municipio = req.body.municipio
            const FilialResponse = await FiliaisDAO.editFilial(id, titulo, cnpj, memo, endereco, municipio)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

}