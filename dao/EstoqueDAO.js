import mongodb, { ObjectId } from 'mongodb'
let ObjectID = mongodb.ObjectId
let estoque;

export default class EstoqueDAO{

    static async injectDB(conn){
        if(estoque){
            return
        }
        try{
            estoque = await conn.db(process.env.EMPRESAS_NS).collection('estoque')
        }catch(e){
            console.error('Nao foi possivel conectar-se ao banco de dados')
        }
    }

    static async addItem(cod, titulo, quantidade, imagem){
        try{
            return await estoque.insertOne({cod: cod, titulo: titulo, quantidade: quantidade, imagem: imagem})
        }catch(e){
            return {error: e}
        }
    }

    static async findItens(page){
        let itemPorPagina = 10
        let cursor;
        try{
            cursor = estoque.find({})
            const displayCursor = cursor.limit(itemPorPagina).skip((page - 1) * itemPorPagina)
            const listaEstoque = await displayCursor.toArray()
            const totalNumEstoque = await estoque.countDocuments({})
            const totalPaginas = Math.ceil(totalNumEstoque / itemPorPagina )
            return { listaEstoque, totalNumEstoque, totalPaginas }
        }catch(e){
            return {error: e.message}
        }
    }

    static async findMissing(){
        try{
            return await estoque.find({quantidade: 0}).toArray()
        }catch(e){
            return {error: e}
        }
    }

    static async editQuantidade(id, novaQuantidade){
        try{
            return await estoque.updateOne({_id: ObjectID(id)}, {$set: {quantidade: novaQuantidade}})
        }catch(e){
            return {error: e}
        }
    }

    static async deleteOne(id){
        try{
            return await estoque.deleteOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e}
        }
    }

    static async findItemById(id){
        try{
            return await estoque.findOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }

    static async updateItem(id, cod, titulo, quantidade){
        try{
            return await estoque.updateOne({_id: ObjectID(id)},{$set: {cod: cod, titulo: titulo, quantidade: quantidade}})
        }catch(e){
            return {error: e.message}
        }
    }

}