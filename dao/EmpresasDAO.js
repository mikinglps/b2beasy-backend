let empresas

export default class EmpresasDAO {
    static async injectDB(conn){
        if(empresas){
            return
        }
        try{
            empresas = await conn.db(process.env.EMPRESAS_NS).collection('empresas')
        } catch(e) {
            console.error(
                `Unable to establish a connection handle in EmpresasDAO: ${e}`
            )
        }
    }

    static async getEmpresas({
        filters = null,
        page = 0,
        empresaPorPagina = 20,
    } = {}){
        let query
        if (filters){
            if("nome" in filters){
                query = { $text: { $search: filters["nome"]}}
            }else if ("cnpj" in filters){
                query = { 'cnpj': { $eq: filters['cnpj']}}
            }
        }
        let cursor

        try{
            cursor = await empresas.find(query)
        } catch (e) { 
            console.error(`Unable to issue find command, ${e}`)
            return { listaEmpresas: [], totalNumEmpresas: 0 }
        }

        const displayCursor = cursor.limit(empresaPorPagina).skip(empresaPorPagina * page)

        try{
            const listaEmpresas = await displayCursor.toArray()
            const totalNumEmpresas = await empresas.countDocuments(query)
            return { listaEmpresas, totalNumEmpresas}
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { listaEmpresas: [], totalNumEmpresas: 0}
        }
    }

    
}
