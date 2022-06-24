import EstoqueDAO from "../dao/EstoqueDAO.js";


export default class EstoqueCtrl{

    static async apiAddItem(req, res){
        try{
            const cod = req.body.cod
            const titulo = req.body.titulo
            const quantidade = req.body.quantidade
            const imagem = req.file.path
            const itemResponse = await EstoqueDAO.addItem(cod, titulo, quantidade, imagem)
            res.json({success: 'success'})
        }catch(e){
            res.json({error: e})
        }
    }

    static async apiFindItem(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const itemResponse = await EstoqueDAO.findItens(page)
            res.json(itemResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindMissing(req, res){
        try{
            const itemResponse = await EstoqueDAO.findMissing()
            res.json(itemResponse)
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiEditQuantidade(req, res){
        try{
            const id = req.body._id
            const novaQuantidade = req.body.novaQuantidade
            const itemResponse = await EstoqueDAO.editQuantidade(id, novaQuantidade)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiDeleteOne(req, res){
        try{
            const id = req.body._id
            const itemResponse = await EstoqueDAO.deleteOne(id)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiFindItemById(req, res){
        try{
            const id = req.body._id
            const itemResponse = await EstoqueDAO.findItemById(id)
            res.json(itemResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateItem(req, res){
        try{
            const id = req.body._id;
            const cod = req.body.cod;
            const titulo = req.body.titulo;
            const quantidade = parseInt(req.body.quantidade);
            const itemResponse = await EstoqueDAO.updateItem(id, cod, titulo, quantidade)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

}