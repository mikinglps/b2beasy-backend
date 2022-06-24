import mongodb, {ObjectId} from 'mongodb'

let ObjectID = mongodb.ObjectId
let clientes;

export default class ClientesDAO{

    static async injectDB(conn){
        if(clientes){
            return
        }
        try{
            clientes = await conn.db(process.env.EMPRESAS_NS).collection('clientes')
        }catch(e){
            console.error('Nao foi possivel conectar-se ao banco de dados')
        }
    }

    static async addCliente(nome, credencial, endereco, fone){
        try{
            const doc = {
                nome: nome,
                credencial: credencial,
                endereco: endereco,
                fone: fone
            }
            return await clientes.insertOne(doc)
        }catch(e){
            return { error: e }
        }
    }

    static async findCliente(page){
            let clientePorPagina = 15
            let cursor;
        try{
            cursor = clientes.find({}).sort({_id: -1})
            const displayCursor = cursor.limit(clientePorPagina).skip((page - 1) * clientePorPagina)
            const listaCliente = await displayCursor.toArray()
            const totalNumCliente = await clientes.countDocuments({})
            const totalPaginas = Math.ceil(totalNumCliente / clientePorPagina )
            return {listaCliente, totalNumCliente, totalPaginas}
        }catch(e){
            return {error: e}
        }

    }

    static async deleteCliente(id){
        try{
            return await clientes.deleteOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }

    static async updateCliente(id, nome, cpf_cnpj, endereco, telefone){
        try{
            return await clientes.updateOne({_id: ObjectID(id)}, {$set:{nome: nome, credencial: cpf_cnpj, endereco: endereco, fone: telefone}})
        }catch(e){
            return {error: e.message}
        }
    }

    static async findClienteById(id){
        try{
            return await clientes.findOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }

}