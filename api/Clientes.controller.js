import ClientesDAO from "../dao/ClientesDAO.js";

export default class ClientesCtrl{

    static async apiAddClientes(req, res){
        try{
            const nome = req.body.titulo;
            const credencial = req.body.credencial;
            const endereco = req.body.endereco;
            const fone = req.body.fone
            const ClientesResponse = await ClientesDAO.addCliente(
                nome,
                credencial,
                endereco,
                fone
            )
            res.json({ status: 'success'})
        }catch(e){
            res.status(500).json({erro: e})
        }
    }

    static async apiFindClientes(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const ClientesResponse = await ClientesDAO.findCliente(page)
            res.json({results: ClientesResponse})
        }catch(e){
            res.status(500).json('Erro ao procurar por clientes')
        }
    }

    static async apiDeleteCliente(req, res){
        try{
            const id = req.body._id
            const ClientesResponse = await ClientesDAO.deleteCliente(id)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateCliente(req, res){
        try{
            const id = req.body._id;
            const nome = req.body.nome;
            const cpf_cnpj = req.body.credencial;
            const endereco = req.body.endereco;
            const telefone = req.body.telefone;
            const ClientesResponse = await ClientesDAO.updateCliente(id, nome, cpf_cnpj, endereco, telefone)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message});
        }
    }

    static async apiFindClienteById(req, res){
        try{
            const id = req.body._id;
            const ClientesResponse = await ClientesDAO.findClienteById(id)
            res.json(ClientesResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }



}