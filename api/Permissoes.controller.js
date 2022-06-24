import PermissoesDAO from "../dao/PermissoesDAO.js";

export default class PermissoesCtrl{
    static async apiAddPermissao(req, res){
        try{
            const cargo = req.body.cargo
            const setor = req.body.setor
            const permissao = req.body.permissao
            const geral = req.body.geral
            const needed = req.body.needed
            const PermissaoResponse = await PermissoesDAO.addPermissao(cargo, setor, permissao, geral, needed)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindPermissao(req, res){
        try{
            const cargo = req.body.cargo
            const setor = req.body.setor
            const geral = req.body.geral
            const needed = req.body.needed
            const PermissaoResponse = await PermissoesDAO.findPermissao(cargo, setor, geral, needed)
            if(PermissaoResponse !== null){
                res.json({found: true, data: PermissaoResponse})
            }else{
                res.json({found: false})
            }
            
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiEditPermissao(req, res){
        try{
            const cargo = req.body.cargo;
            const setor = req.body.setor;
            const permissao = req.body.permissao;
            const geral = req.body.geral;
            const needed = req.body.needed
            const PermissaoResponse = await PermissoesDAO.editPermissao(cargo, setor, permissao, geral, needed)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindPermissaoByCargo(req, res){
        try{
            const cargo = req.body.cargo;
            const PermissaoResponse = await PermissoesDAO.findPermissaoByCargo(cargo)
            res.json(PermissaoResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeletePermissao(req, res){
        try{
            const id = req.body._id;
            const PermissaoResponse = await PermissoesDAO.deletePermissao(id)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

}