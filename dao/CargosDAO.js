import mongodb, {ObjectId} from 'mongodb'

let ObjectID = mongodb.ObjectId
let cargos;

export default class CargosDAO{
    static async injectDB(conn){
        if(cargos){
            return
        }
        try{
            cargos = await conn.db(process.env.EMPRESAS_NS).collection('cargos')
        }catch(e){
            return {error: e.message}
        }
    }


    static async addCargo(titulo, setor, filial){
        try{
            return await cargos.insertOne({titulo: titulo, setor: ObjectID(setor), filial: ObjectID(filial)})
        }catch(e){
            return {error: e.message}
        }
    }

    static async findAllCargos(page){
        let cursor;
        let cargoPorPagina = 10;
        try{
            cursor = cargos.find({})
            const displayCursor = cursor.limit(cargoPorPagina).skip((page - 1) * cargoPorPagina)
            const listaCargo = await displayCursor.toArray()
            const totalNumCargo = await cargos.countDocuments({})
            const totalPaginas = Math.ceil(totalNumCargo / cargoPorPagina )
            return { listaCargo, totalNumCargo, totalPaginas }
        }catch(e){
            return {error: e.message}
        }
    }

    static async deleteCargoById(id){
        try{
            return await cargos.deleteOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }

    static async findCargosOnSetor(id){
        try{
            return await cargos.find({setor: ObjectID(id)}).toArray()
        }catch(e){
            return {error: e.message}
        }
    }

    static async findCargoById(id){
        try{
            return await cargos.findOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }

    static async updateCargo(id, filial, setor, titulo){
        try{
            return await cargos.updateOne({_id: ObjectID(id)}, {$set: {filial: ObjectID(filial), setor: ObjectID(setor), titulo: titulo}})
        }catch(e){
            return {error: e.message}
        }
    }
}