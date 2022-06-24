import mongodb, {ObjectId} from 'mongodb';
let ObjectID = mongodb.ObjectId;
let rascunhos;
export default class RascunhosDAO{
    static async injectDB(conn){
        if(rascunhos){
            return
        }
        try{
            rascunhos = await conn.db(process.env.EMPRESAS_NS).collection('rascunhos')
        }catch (e){
            console.error('Nao foi possivel conectar ao banco')

        }
    }

    static async addRascunho(remetente, cpf, filialRemetente, remetenteSetor, destinatario, setorDestinatario, memoNum,
        assunto, conteudo, data, classe, enderecoRemetente, imgRemetente){
            try{
                if(classe == 'memorando'){
                    return await rascunhos.insertOne({remetente: remetente, cpf: cpf, filialRemetente: ObjectID(filialRemetente), setorRemetente: ObjectID(remetenteSetor),
                        destinatario: ObjectID(destinatario), setorDestinatario: ObjectID(setorDestinatario), numero: memoNum,
                        assunto: assunto, conteudo: conteudo, data: data, classe: classe, enderecoRemetente: enderecoRemetente, imgRemetente: imgRemetente})
                }else{
                    return await rascunhos.insertOne({remetente: remetente, cpf: cpf, filialRemetente: ObjectID(filialRemetente), setorRemetente: ObjectID(remetenteSetor),
                        destinatario: destinatario, setorDestinatario: setorDestinatario, numero: memoNum,
                        assunto: assunto, conteudo: conteudo, data: data, classe: classe, enderecoRemetente: enderecoRemetente, imgRemetente: imgRemetente})
                }
            
            }catch(e){
                return {error: e}
            }
        }
    static async findMyRascunhos(cpf, page){
        let rascunhoPorPagina = 10
        let cursor;
        try{
            cursor = rascunhos.find({cpf: cpf}).sort({_id: -1})
            const displayCursor = cursor.limit(rascunhoPorPagina).skip((page - 1) * rascunhoPorPagina)
            const listaDoc = await displayCursor.toArray()
            const totalNumDoc = await rascunhos.countDocuments({cpf: cpf} )
            const totalPaginas = Math.ceil(totalNumDoc / rascunhoPorPagina )
            return {listaDoc, totalNumDoc, totalPaginas}
        }catch(e){
            return {error: e}
        }
    }

    static async findRascunhoById(id){
        try{
            return await rascunhos.findOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }
}