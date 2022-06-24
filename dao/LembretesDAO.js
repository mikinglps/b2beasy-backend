import mongodb, {ObjectId} from 'mongodb'

let ObjectID = mongodb.ObjectId
let lembretes;

export default class LembretesDAO{
    static async injectDB(conn){
        if(lembretes){
            return
        }
        try{
            lembretes = await conn.db(process.env.EMPRESAS_NS).collection('lembretes')
        }catch (e){
            console.error('Nao foi possivel conectar ao banco')

        }
    }

    static async addLembrete(titulo, descricao, data, horario, cpf){
        try{
            return await lembretes.insertOne({titulo: titulo, descricao: descricao, data: data, horario: horario, cpf: cpf})
        }catch(e){
            return {error: e}
        }
    }

    static async findMyLembretes(cpf, page){
        let itemPorPagina = 15
        let cursor;
        try{
            cursor = lembretes.find({cpf: cpf}).sort({_id: -1})
            const displayCursor = cursor.limit(itemPorPagina).skip((page - 1) * itemPorPagina)
            const listaLembretes = await displayCursor.toArray()
            const totalNumLembretes = await lembretes.countDocuments({})
            const totalPaginas = Math.ceil(totalNumLembretes / itemPorPagina )
            return {listaLembretes, totalNumLembretes, totalPaginas}
        }catch(e){
            return {error: e.message}
        }
    }

    static async findMyLembretesSidebar(cpf){
        try{
            return await lembretes.find({cpf: cpf}).limit(9).sort({_id: -1}).toArray()
        }catch(e){
            return {error: e}
        }
    }

    static async deleteLembrete(id){
        try{
            return await lembretes.deleteOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e}
        }
    }

}