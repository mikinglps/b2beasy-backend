import OptionsDAO from "../dao/OptionsDAO.js";

export default class OptionsCtrl{
    static async apiAddOption(req, res){
        try{
            const log = req.body.log;
            const oficio = req.body.oficio;
            const optionResponse = await OptionsDAO.addConfig(log, oficio)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindLast(req, res){
        try{
            const optionResponse = await OptionsDAO.findLast()
            res.json(optionResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}