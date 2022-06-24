import mongodb, {ObjectId} from 'mongodb'

let ObjectID = mongodb.ObjectId
let tarefas;

export default class TarefasDAO{
    static async injectDB(conn){
        if(tarefas){
            return
        }
        try{
            tarefas = await conn.db(process.env.EMPRESAS_NS).collection('tarefas')
        }catch(e){
            return {error: e.message}
        }
    }

    static async addTarefa(responsavel, usuario, titulo, tarefa, quando){
        try{
            return await tarefas.insertOne({responsavel: responsavel, usuario: usuario, titulo: titulo, tarefa: tarefa, quando: quando})
        }catch(e){
            return {error: e.message}
        }
    }

    static async findMyTasks(cpf, page){
        let tarefasPorPagina = 10
        let cursor;
        try{
            cursor = tarefas.find({usuario: cpf}).sort({_id: -1})
            const displayCursor = cursor.limit(tarefasPorPagina).skip((page - 1) * tarefasPorPagina)
            const listaTarefas = await displayCursor.toArray()
            const totalNumTarefas = await tarefas.countDocuments({cpf: cpf})
            const totalPaginas = Math.ceil(totalNumTarefas / tarefasPorPagina )
            return { listaTarefas, totalNumTarefas, totalPaginas }
        }catch(e){
            return {error: e.message}
        }
    }

    static async findMyTasksSidebar(cpf){
        try{
            return await tarefas.find({usuario: cpf}).limit(9).sort({_id: -1}).toArray()
        }catch(e){
            return {error: e}
        }
    }
}