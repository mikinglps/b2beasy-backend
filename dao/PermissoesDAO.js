import mongodb, {ObjectId} from 'mongodb'

let ObjectID = mongodb.ObjectId
let permissoes;

export default class PermissoesDAO{
    static async injectDB(conn){
        if(permissoes){
            return
        }
        try{
            permissoes = await conn.db(process.env.EMPRESAS_NS).collection('permissoes')
        }catch(e){
            return {error: e.message}
        }
    }

    static async addPermissao(cargo, setor, permissao, geral, needed){
        try{
            if(needed){
                return permissoes.insertOne({cargo: ObjectID(cargo), setor: ObjectID(setor), permissao: permissao, geral: geral})
            }else{
                return permissoes.insertOne({cargo: ObjectID(cargo), setor: setor, permissao: permissao, geral: geral})
            }
            
        }catch(e){
            return {error: e.message}
        }
    }

    static async findPermissao(cargo, setor, geral, needed){
        try{
            if(needed){
                return permissoes.findOne({cargo: ObjectID(cargo), setor: ObjectID(setor), geral: geral})
            }else{
                return permissoes.findOne({cargo: ObjectID(cargo), setor: setor, geral: geral})
            }
            
        }catch(e){
            return {error: e.message}
        }
    }

    static async editPermissao(cargo, setor, permissao, geral, needed){
        try{
            if(needed){
                return permissoes.updateOne({cargo: ObjectID(cargo), setor: ObjectID(setor), geral: geral}, {$set: {permissao: permissao}})
            }else{
                return permissoes.updateOne({cargo: ObjectID(cargo), setor: setor, geral: geral}, {$set: {permissao: permissao}})
            }
            
        }catch(e){
            return {error: e.message}
        }
    }

    static async findPermissaoByCargo(cargo){
        try{
            return await permissoes.find({cargo: ObjectID(cargo)}).toArray()
        }catch(e){
            return {error: e.message}
        }
    }

    static async deletePermissao(id){
        try{
            return await permissoes.deleteOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }
}