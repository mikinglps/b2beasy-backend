import TarefasDAO from "../dao/TarefasDAO.js";

export default class TarefasCtrl{
    static async apiAddTarefa(req, res){
        try{
            const responsavel = req.body.responsavel
            const usuario = req.body.usuario
            const titulo = req.body.titulo
            const tarefa = req.body.tarefa
            const quando = req.body.quando
            const tarefaResponse = await TarefasDAO.addTarefa(responsavel, usuario, titulo, tarefa, quando)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindMyTasks(req, res){
        try{
        const page = parseInt(req.query.page) || 1
        const cpf = req.body.cpf
        const tarefaResponse = await TarefasDAO.findMyTasks(cpf, page)
        res.json(tarefaResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindMyTasksSidebar(req, res){
        try{
            const cpf = req.body.cpf
            const tarefaResponse = await TarefasDAO.findMyTasksSidebar(cpf)
            res.json(tarefaResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}