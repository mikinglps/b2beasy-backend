import CargosDAO from "../dao/CargosDAO.js";

export default class CargosCtrl{
    static async apiAddCargo(req, res){
        try{
            const titulo = req.body.titulo
            const setor = req.body.setor
            const filial = req.body.filial
            const CargoResponse = await CargosDAO.addCargo(titulo, setor, filial)
            res.json({status: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindCargo(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const CargoResponse = await CargosDAO.findAllCargos(page)
            res.json(CargoResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteCargo(req, res){
        try{
            const id = req.body._id;
            const CargoResponse = await CargosDAO.deleteCargoById(id)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindCargoOnSetor(req, res){
        try{
            const id = req.body._id
            const CargoResponse = await CargosDAO.findCargosOnSetor(id)
            res.json(CargoResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindCargoById(req, res){
        try{
            const id = req.body._id;
            const CargoResponse = await CargosDAO.findCargoById(id)
            res.json(CargoResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateCargo(req, res){
        try{
            const id = req.body._id;
            const filial = req.body.filial;
            const setor = req.body.setor;
            const titulo = req.body.titulo;
            const CargoResponse = await CargosDAO.updateCargo(id, filial, setor, titulo)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}