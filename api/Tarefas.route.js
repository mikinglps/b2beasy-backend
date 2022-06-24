import express from "express";
import TarefasCtrl from "./Tarefas.controller.js";

const tarefas = express.Router()

tarefas.route('/add').post(TarefasCtrl.apiAddTarefa)
tarefas.route('/find').post(TarefasCtrl.apiFindMyTasks)
tarefas.route('/find/sidebar').post(TarefasCtrl.apiFindMyTasksSidebar)

export default tarefas