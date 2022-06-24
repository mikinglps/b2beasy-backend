import mongodb, { ObjectId } from 'mongodb'

const ObjectID = mongodb.ObjectId
let filiais

export default class FiliaisDAO {

    static async injectDB(conn){
        if(filiais){
            return
        }
        try{
            filiais = await conn.db(process.env.EMPRESAS_NS).collection('filiais')
        }catch (e){
            console.error('Nao foi possivel conectar ao banco')

        }
    }

    static async addFilial(titulo, cnpj, memo){
        try{
            const filiaisDoc = {
                titulo: titulo,
                cnpj: cnpj,
                memo: memo
            }
            return await filiais.insertOne(filiaisDoc)
        }catch (e){
            return {error: e}
        }
    }

    static async findFilialNoPage(){
        try{
            return await filiais.find({}).sort({titulo: 1}).toArray()
        }catch(e){
            return {error: e.message}
        }
    }

    static async findAllFiliais(page){
        let filialPorPagina = 10
        let cursor;
        try{
            cursor = filiais.find({}).sort({_id: -1})
            const displayCursor = cursor.limit(filialPorPagina).skip((page - 1) * filialPorPagina)
            const listaFilial = await displayCursor.toArray()
            const totalNumFilial = await filiais.countDocuments({})
            const totalPaginas = Math.ceil(totalNumFilial / filialPorPagina )
            return {listaFilial, totalNumFilial, totalPaginas}
        }catch(e){
            return {error: e}
        }
    }

    static async findSelectedFilial(titulo){
        try{
            return await filiais.findOne({titulo: titulo})
        }catch(e){
            return {error: e}
        }
    }

    static async editMemo(id, memo){
        try{
            return await filiais.updateOne({_id: ObjectID(id)}, { $set: {memo: memo}})
        }catch(e){
            return {error: e}
        }
    }

    static async findMyFilial(id){
        try{
            return await filiais.findOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e}
        }
    }

    static async deleteFilialById(id){
        try{
            return await filiais.deleteOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }

    static async editFilial(id, titulo, cnpj, memo, endereco, municipio){
        try{
            return await filiais.updateOne({_id: ObjectID(id)}, {$set: {titulo: titulo, cnpj: cnpj, memo: memo, endereco: endereco, municipio: municipio}})
        }catch(e){
            return {error: e.message}
        }
    }

}