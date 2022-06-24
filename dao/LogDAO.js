let logs;

export default class LogDAO {
    static async injectDB(conn){
        if(logs){
            return
        }
        try{
            logs = await conn.db(process.env.EMPRESAS_NS).collection('logs')
        }catch(e){
            console.error('Nao foi possivel conectar ao banco de dados')
        }
    }

    static async addLog(nome, cpf, date, acao){
        try{
            const logDoc = {
                nome: nome,
                cpf: cpf,
                data: date,
                acao: acao
            }
            return await logs.insertOne(logDoc)
        }catch(e){
            console.error('Erro')
            return {error: e}
        }
    }

    static async findLogs(page){
        let logPorPagina = 15
        let cursor;
        try{
            cursor = logs.find({}).sort({_id: -1})
            const displayCursor = cursor.limit(logPorPagina).skip((page - 1) * logPorPagina)
            const listaLog = await displayCursor.toArray()
            const totalNumLogs = await logs.countDocuments({})
            const totalPaginas = Math.ceil(totalNumLogs / logPorPagina )
            return {listaLog, totalNumLogs, totalPaginas}
        }catch(e){
            return {error: e.message}
        }
    }
}