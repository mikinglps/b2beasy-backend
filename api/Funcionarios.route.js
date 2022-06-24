import express from 'express'
import session from 'express'
import FuncionariosCtrl from './Funcionarios.controller.js'

const routerF = express.Router()
const logado = express();

logado.use(session({secret: 'lkmvbchxyiu283#asdxlkj'}))
routerF.route("/").post(FuncionariosCtrl.apiFindFuncionario)
routerF.route("/setor").post(FuncionariosCtrl.apiFindOnSector)
routerF.route('/setor/geral').post(FuncionariosCtrl.findGeral)
routerF.route('/memo/cpf').post(FuncionariosCtrl.apiFindFuncionarioByCpf)
routerF.route('/delete').post(FuncionariosCtrl.apiDeleteFuncionarioById)
routerF.route('/id').post(FuncionariosCtrl.apiFindFuncionarioById)


export default routerF