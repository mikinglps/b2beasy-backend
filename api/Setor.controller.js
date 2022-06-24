import SetorDAO from "../dao/SetorDAO.js";

export default class SetorCtrl{
    static async apiFindSector(req, res, next){
        try{
            const page = parseInt(req.query.page) || 1
            const SetorResponse = await SetorDAO.apiFindSector(page)
            res.json({results: SetorResponse})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindSectorNoPage(req, res){
        try{
            const SetorResponse = await SetorDAO.apiFindSectorNoPage()
            res.json({results: SetorResponse})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiAddFilial(req, res){
        try{
            const titulo = req.body.titulo
            const filial = req.body.filial
            const SetorResponse = await SetorDAO.addSetor(titulo, filial)
            res.json(SetorResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiFindSectorOnFilial(req, res){
        try{
        const id = req.body._id
        const SetorResponse = await SetorDAO.findSectorOnFilial(id)
        res.json({results: SetorResponse})
        }catch(e){
            res.status(500).json({error: e.message})
        }

    }

    static async apiFindNomeById(req, res){
        try{
            const id = req.body._id;
            const SetorResponse = await SetorDAO.findNomeById(id)
            res.json(SetorResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiDeleteSetor(req, res){
        try{
            const id = req.body._id;
            const SetorResponse = await SetorDAO.deleteSetor(id)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiEditSetor(req, res){
        try{
            const id = req.body._id
            const titulo = req.body.titulo
            const filial = req.body.filial
            const SetorResponse = await SetorDAO.editSetor(id, titulo, filial)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    

}