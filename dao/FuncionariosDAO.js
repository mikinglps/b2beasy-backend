import mongodb, { ObjectId } from "mongodb";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../auth/auth.js'

const ObjectID = mongodb.ObjectId

let funcionarios

export default class FuncionariosDAO {
    static async injectDB(conn){
        if (funcionarios){
            return
        }
        try{
            funcionarios = await conn.db(process.env.EMPRESAS_NS).collection('funcionarios')
        } catch (e) {
            console.error(`Unable to establish connection in funcionariosDAO, ${e}`)
        }
    }

    static async apiAddFuncionario(empresaId, user, funcionario, cpf, hash){
        try{
            const funcionarioDoc = { nome: user.nome, 
                userId: user._id, 
                cpf: cpf, 
                funcionario: funcionario,
                senha: hash, 
                empresaId: ObjectID(empresaId),}
            return await funcionarios.insertOne(funcionarioDoc)
        } catch (e) {
            console.error(`Unable to post new employee, ${e}`)
            return { error: e}
        }
    }

    static async apiUpdateFuncionario(func_id, userId, funcionario, date){
        try{
            const FuncionarioResponse = await funcionarios.updateOne({userId: userId, _id: ObjectID(func_id)},
            { $set: { funcionario: funcionario, date: date }},
            )

            return FuncionarioResponse
        } catch (e) {
            console.error(`Unable to update funcionario: ${e}`)
            return { error: e }
        }
    }

    static async apiDeleteFuncionario(func_id, userId){
        try{
            const deleteFuncionario = await funcionarios.deleteOne({
                _id: ObjectID(func_id),
                userId: userId,
            })
        } catch (e) {
            console.error(`Unable to delete employee: ${e}`)
            return { error: e}
        }
    }

    static async apiFindFuncionario(cpf, senha){
        let message
        try{
            const achaFuncionario = await funcionarios.findOne({'cpf': { $eq: cpf }})
            if(achaFuncionario){
                const token = jwt.sign( { id: achaFuncionario._id }, secret, { expiresIn: 36000 })
                let senhaValida = await bcrypt.compare(senha, achaFuncionario.senha)
                if(senhaValida){
                    return { achaFuncionario, token }
                }else{
                    message = 'senha incorreta'
                    return message
                }
            }else{
                message = 'cpf nao encontrado'
                return message
            }
        } catch (e) {
            console.error(`Unable to find user: ${e}`)
            return { error: e }
        }
    }

    static async apiFindOnSector(setor, page){
        let funcionarioPorPagina = 10
        let cursor;
        
        try{
            cursor = funcionarios.find({'setor': ObjectID(setor)})
            const displayCursor = cursor.limit(funcionarioPorPagina).skip((page - 1) * funcionarioPorPagina)
            const listaFuncionarios = await displayCursor.toArray()
            const totalNumFuncionarios = await funcionarios.countDocuments({'setor': ObjectID(setor)})
            const totalPaginas = Math.ceil(totalNumFuncionarios / funcionarioPorPagina )
            return { listaFuncionarios, totalNumFuncionarios, totalPaginas }
        } catch (e){
            console.error('Problemas na solicitacao')
            return { listaFuncionarios: [], totalNumFuncionarios: 0, totalPaginas: 0 }
        }
    }

    static async apiFindFuncionarioGeral(nome){
        let message;
        try{
        const achaFuncionario = await funcionarios.find({nome: new RegExp(nome, 'i')}).toArray()
            if(achaFuncionario){
                if(nome == ''){
                    return 
                }else{
                return { achaFuncionario }
                }
            }else{
                message = 'Nao existem funcionarios com esse nome'
                return message
            }
        }catch(e){
            console.error('Nao foi possivel fazer solicitacao')
            return {erro: e}
        }
    }

    static async findFuncionarioByCpf(cpf){
        try{
            return await funcionarios.findOne({cpf: { $eq: cpf }})
        }catch(e){
            return {erro: e}
        }
    }

    static async deleteFuncionario(id){
        try{
            return await funcionarios.deleteOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }

    static async findFuncionarioById(id){
        try{
            return await funcionarios.findOne({_id: ObjectID(id)})
        }catch(e){
            return {error: e.message}
        }
    }
}