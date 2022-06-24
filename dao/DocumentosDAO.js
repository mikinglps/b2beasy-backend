import mongodb, {ObjectId} from 'mongodb'

let ObjectID = mongodb.ObjectId
let documentos

export default class DocumentosDAO{
    static async injectDB(conn){
        if(documentos){
            return
        }
        try{
            documentos = await conn.db(process.env.EMPRESAS_NS).collection('documentos')
        }catch (e){
            console.error('Nao foi possivel conectar ao banco')

        }
    }

    static async findMyDocs(cpf, page){
        let docPorPagina = 10
        let cursor;
        try{
            cursor = documentos.find({cpf: cpf} ).sort({_id: -1})
            const displayCursor = cursor.limit(docPorPagina).skip((page - 1) * docPorPagina)
            const listaDoc = await displayCursor.toArray()
            const totalNumDocs = await documentos.countDocuments({cpf: cpf} )
            const totalPaginas = Math.ceil(totalNumDocs / docPorPagina )
            return {listaDoc, totalNumDocs, totalPaginas}
        }catch(e){
            return {error: e.message}
        }
    }

    static async addDoc(remetente, cpf, filialRemetente, remetenteSetor, destinatario, setorDestinatario,
        numero, assunto, conteudo, data, classe, enderecoRemetente, imgRemetente){
        try{
            if(classe == 'memorando'){
                return await documentos.insertOne({remetente: remetente, cpf: cpf, filialRemetente: ObjectID(filialRemetente), setorRemetente: ObjectID(remetenteSetor),
                    destinatario: ObjectID(destinatario), setorDestinatario: ObjectID(setorDestinatario), numero: numero,
                    assunto: assunto, conteudo: conteudo, data: data, classe: classe, enderecoRemetente: enderecoRemetente, imgRemetente: imgRemetente})
            }else{
                return await documentos.insertOne({remetente: remetente, cpf: cpf, filialRemetente: ObjectID(filialRemetente), setorRemetente: ObjectID(remetenteSetor),
                    destinatario: destinatario, setorDestinatario: setorDestinatario, numero: numero,
                    assunto: assunto, conteudo: conteudo, data: data, classe: classe, enderecoRemetente: enderecoRemetente, imgRemetente: imgRemetente})
            }
            
            
        }catch(e){
            return {error: e}
        }
    }

    static async findDocBySetor(setor, filial, aba, page){
        let docPorPagina = 15
        let cursor;
        let totalNumDocs;
        try{
            if(aba == 'todos'){
                cursor = documentos.find({$or : [ {setorDestinatario: setor, destinatario: filial}, 
                    {setorRemetente: setor, filialRemetente: filial}, {setorDestinatario: ObjectID(setor), destinatario: ObjectID(filial)},
                {setorRemetente: ObjectID(setor), filialRemetente: ObjectID(filial)}]}).sort({_id: -1})
                totalNumDocs = await documentos.countDocuments({ $or: [ {setorDestinatario: setor, destinatario: filial}, 
                    {setorRemetente: setor, filialRemetente: filial}, {setorDestinatario: ObjectID(setor), destinatario: ObjectID(filial)},
                    {setorRemetente: ObjectID(setor), filialRemetente: ObjectID(filial)} ] } )
            }else{
                cursor = documentos.find({$and: [ {$or: [ {setorDestinatario: setor, destinatario: filial}, 
                    {setorRemetente: setor, filialRemetente: filial}  , {setorDestinatario: ObjectID(setor), destinatario: ObjectID(filial)},
                    {setorRemetente: ObjectID(setor), filialRemetente: ObjectID(filial)}]}, {classe: aba}]} ).sort({_id: -1})
                totalNumDocs = await documentos.countDocuments({$and: [ {$or: [ {setorDestinatario: setor, destinatario: filial},
                     {setorRemetente: setor, filialRemetente: filial}, {setorDestinatario: ObjectID(setor), destinatario: ObjectID(filial)},
                     {setorRemetente: ObjectID(setor), filialRemetente: ObjectID(filial)}]}, {classe: aba}]})
            }
            const displayCursor = cursor.limit(docPorPagina).skip((page - 1) * docPorPagina)
            const listaDoc = await displayCursor.toArray()
            const totalPaginas = Math.ceil(totalNumDocs / docPorPagina )
            return {listaDoc, totalNumDocs, totalPaginas}
        }catch(e){
            return {error: e}
        }
    }

    static async findLastNum(classe){
        try{
            return await documentos.find({classe: classe}).sort({_id: -1}).limit(1).toArray()
        }catch(e){
            return {error: e.message}
        }
    }

    static async uploadFile(remetente, cpf, filialRemetente, setorRemetente, destinatario, setorDestinatario, numero, assunto, conteudo, data, classe, enderecoRemetente, imgRemetente, fileToUpload){
        try{
            return await documentos.insertOne({
                remetente: remetente,
                cpf: cpf,
                filialRemetente: ObjectID(filialRemetente),
                setorRemetente: ObjectID(setorRemetente),
                destinatario: ObjectID(destinatario),
                setorDestinatario: ObjectID(setorDestinatario),
                numero: numero,
                assunto: assunto,
                conteudo: conteudo,
                data: data,
                classe: classe,
                enderecoRemetente: enderecoRemetente,
                imgRemetente: imgRemetente,
                url: fileToUpload})
        }catch(e){
            return {error: e.message}
        }
    } 

    static async findDocById(id){
        try{
            return await documentos.findOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }


    
}