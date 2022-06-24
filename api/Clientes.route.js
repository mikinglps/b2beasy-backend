import express from "express";
import ClientesCtrl from "./Clientes.controller.js";

const clientes = express.Router()

clientes.route('/find').post(ClientesCtrl.apiFindClientes)
clientes.route('/').post(ClientesCtrl.apiAddClientes)
clientes.route('/delete').post(ClientesCtrl.apiDeleteCliente)
clientes.route('/edit').post(ClientesCtrl.apiUpdateCliente)
clientes.route('/id').post(ClientesCtrl.apiFindClienteById)

export default clientes