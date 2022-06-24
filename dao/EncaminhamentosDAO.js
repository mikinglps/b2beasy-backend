import mongodb, {ObjectId} from 'mongodb'

let ObjectID = mongodb.ObjectId
let encaminhamentos;

export default class EncaminhamentosDAO{
    static async injectDB(conn){
        if(encaminhamentos){
            return
        }
        try{
            encaminhamentos = await conn.db(process.env.EMPRESAS_NS).collection('encaminhamentos')
        }catch (e){
            console.error('Nao foi possivel conectar ao banco')

        }
    }

    static async addEncaminhamento(documento, destinatario, remetente){
        try{
            return await encaminhamentos.insertOne({documento: ObjectID(documento), destinatario: ObjectID(destinatario), remetente: ObjectID(remetente)})
        }catch(e){
            return {error: e.message}
        }
    }

    static async findEncaminhamento(page, usuario){
        try{
            let encPorPage = 15;
            let cursor;
            let totalNumEnc;
            cursor = encaminhamentos.find({destinatario: ObjectID(usuario)}).sort({_id: -1})
            const displayCursor = cursor.limit(encPorPage).skip((page - 1) * encPorPage)
            const listaEnc = await displayCursor.toArray()
            totalNumEnc = await encaminhamentos.countDocuments({'destinatario': ObjectID(usuario)})
            const totalPaginas = Math.ceil(totalNumEnc / encPorPage )
            return {listaEnc, totalPaginas}
        }catch(e){
            return {error: e.message}
        }
    }
}