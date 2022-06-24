import express from 'express'
import EmpresasCtrl from './Empresas.controller.js'
import FuncionariosCtrl from './Funcionarios.controller.js'

const router = express.Router()

router.route("/").get(EmpresasCtrl.apiGetEmpresas)

router
    .route('/funcionarios')
    .post(FuncionariosCtrl.apiAddFuncionario)
    .put(FuncionariosCtrl.apiUpdateFuncionario)
    .delete(FuncionariosCtrl.apiDeleteFuncionario)

export default router