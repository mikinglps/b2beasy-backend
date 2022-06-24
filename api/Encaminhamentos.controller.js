import EncaminhamentosDAO from "../dao/EncaminhamentosDAO.js";

export default class EncaminhamentosCtrl{
    static async apiAddEncaminhamento(req, res){
        try{
            const documento = req.body.documento;
            const destinatario = req.body.destinatario;
            const remetente = req.body.remetente;
            const EncaminhamentoResponse = await EncaminhamentosDAO.addEncaminhamento(documento, destinatario, remetente);
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindEncaminhamento(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const usuario = req.body.usuario
            const EncaminhamentoResponse = await EncaminhamentosDAO.findEncaminhamento(page, usuario);
            res.json(EncaminhamentoResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}