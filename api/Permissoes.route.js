import express from "express";
import PermissoesCtrl from "./Permissoes.controller.js";

const permissoes = express.Router()

permissoes.route('/').post(PermissoesCtrl.apiAddPermissao)
permissoes.route('/find').post(PermissoesCtrl.apiFindPermissao)
permissoes.route('/edit').post(PermissoesCtrl.apiEditPermissao)
permissoes.route('/cargo').post(PermissoesCtrl.apiFindPermissaoByCargo)
permissoes.route('/delete').post(PermissoesCtrl.apiDeletePermissao)

export default permissoes