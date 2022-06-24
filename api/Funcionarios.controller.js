import FuncionariosDAO from '../dao/FuncionariosDAO.js'
import bcrypt from 'bcrypt'

export default class FuncionariosCtrl {

    static async apiAddFuncionario(req, res, next) {
        try{
            const empresaId = req.body.empresaId
            const funcionario = req.body.funcionario
            const senha = req.body.senha
            const userInfo = {
                nome: req.body.nome,
                _id: req.body.userId
            }
            const hash = await bcrypt.hash(senha, 10)
            const cpf = req.body.cpf

            const FuncionarioResponse = await FuncionariosDAO.apiAddFuncionario(
                empresaId,
                userInfo,
                funcionario,
                cpf,
                hash
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json( { error: e.message } )
        }
    }

    static async apiUpdateFuncionario(req, res, next) {
        try{
            const func_id = req.body.func_id
            const userId = req.body.userId
            const text = req.body.funcionario
            const date = new Date()

            const FuncionarioResponse = await FuncionariosDAO.apiUpdateFuncionario(
                func_id,
                userId,
                text,
                date
            )

            var { error } = FuncionarioResponse
            if (error) {
                res.status(400).json({ error })
            }

            if(FuncionarioResponse.modifiedCount === 0){
                throw new Error(
                    "Unable to update review - user may not be original poster"
                )
            }
            res.json(FuncionarioResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteFuncionario(req, res, next){
        try{
            const func_id = req.body.func_id
            const userId = req.body.userId
            const FuncionarioResponse = await FuncionariosDAO.apiDeleteFuncionario(
                func_id,
                userId
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindFuncionario(req, res, next){
        try{
            const cpf = req.body.cpf
            const senha = req.body.senha
            const FuncionarioResponse = await FuncionariosDAO.apiFindFuncionario(
                cpf,
                senha
            )
            res.json(FuncionarioResponse)
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindOnSector(req, res, next){
        try{
        const setor = req.body.setor
        const page = parseInt(req.query.page)|| 1
        const FuncionarioResponse = await FuncionariosDAO.apiFindOnSector(
            setor,
            page
        )
        res.json({results: FuncionarioResponse})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async findGeral(req, res, next){
        try{
            const nome = req.body.nome
            const FuncionarioResponse = await FuncionariosDAO.apiFindFuncionarioGeral(nome)
            res.json({results: FuncionarioResponse})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindFuncionarioByCpf(req, res){
        try{
            const cpf = req.body.cpf;
            const FuncionarioResponse = await FuncionariosDAO.findFuncionarioByCpf(cpf)
            res.json({results: FuncionarioResponse})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteFuncionarioById(req, res){
        try{
            const id = req.body._id;
            const FuncionarioResponse = await FuncionariosDAO.deleteFuncionario(id)
            res.json({success: 'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiFindFuncionarioById(req, res){
        try{
            const id = req.body._id;
            const FuncionarioResponse = await FuncionariosDAO.findFuncionarioById(id)
            res.json(FuncionarioResponse)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

}