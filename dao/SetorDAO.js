import mongodb, { ObjectId } from 'mongodb'

let setores;

const ObjectID = mongodb.ObjectId

export default class SetorDAO{
    static async injectDB(conn){
        if(setores){
            return
        }
        try{
            setores = await conn.db(process.env.EMPRESAS_NS).collection('setor')
        } catch(e){
            console.error('Nao foi possivel conectar-se a setores')
        }
    }

    static async apiFindSectorNoPage(){
        try{
            return await setores.find({}).sort({_id: -1}).toArray()
        }catch(e){
            return {error: e.message}
        }
    }

    static async apiFindSector(page){
        let setorPorPagina = 10;
        let cursor;
        try{
            cursor = setores.find({}).sort({_id: -1})
            const displayCursor = cursor.limit(setorPorPagina).skip((page - 1) * setorPorPagina)
            const listaSetor = await displayCursor.toArray()
            const totalNumSetor = await setores.countDocuments({})
            const totalPaginas = Math.ceil(totalNumSetor / setorPorPagina )
            return {listaSetor, totalNumSetor, totalPaginas}
        }catch(e){
            return {error: e.message}
        }
    }

    static async addSetor(titulo, filial){
        try{
            const setorDoc = {
                titulo: titulo,
                filial: ObjectID(filial)
            }
            return await setores.insertOne(setorDoc)
        }catch (e){
            return {error: e}
        }
    }

    static async findSectorOnFilial(id){
        try{
            return await setores.find({filial: ObjectID(id)}).toArray()
        }catch(e){
            return {error: e.message}
        }
    }

    static async findNomeById(id){
        try{
            return await setores.findOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e}
        }
    }

    static async deleteSetor(id){
        try{
            return await setores.deleteOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }

    static async editSetor(id, titulo, filial){
        try{
            return await setores.updateOne({_id: ObjectID(id)}, {$set: {titulo: titulo, filial: filial}})
        }catch(e){
            return {error: e.message}
        }
    }

}