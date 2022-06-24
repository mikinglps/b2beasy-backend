import LogDAO from "../dao/LogDAO.js"

export default class LogCtrl{
    static async apiAddLog(req, res){
        try{
            const nome = req.body.nome
            const cpf = req.body.cpf
            const date = new Date()
            const formatter = Intl.DateTimeFormat("pt-BR", {
                timeZone: 'America/Sao_Paulo',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            })
            const formatado = formatter.format(date)
            const acao = req.body.acao
            const LogResponse = await LogDAO.addLog(nome, cpf, formatado, acao)
            res.json({status : 'success'})
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiFindLogs(req, res){
        try{
            const page = parseInt(req.query.page) || 1
            const LogResponse = await LogDAO.findLogs(page)
            res.json({results: LogResponse})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}