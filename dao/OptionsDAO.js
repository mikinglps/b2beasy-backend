let options;

export default class OptionsDAO{
    static async injectDB(conn){
        if(options){
            return
        }
        try{
            options = await conn.db(process.env.EMPRESAS_NS).collection('options')
        } catch(e){
            console.error('Nao foi possivel conectar-se as opcoes')
        }
    }

    static async addConfig(log, oficio){
        try{
            const optionsDao = options.insertOne({log: log, oficio: oficio})
            return {success: 'success'}
        }catch(e){
            return {error: e.message}
        }
    }

    static async findLast(){
        try{
            return await options.find({}).sort({_id: -1}).limit(1).toArray()
        }catch(e){
            return {error: e.message}
        }
    }
}