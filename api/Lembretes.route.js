import express from "express";
import LembretesCtrl from "./Lembretes.controller.js";

const lembretes = express.Router()

lembretes.route('/add').post(LembretesCtrl.apiAddLembrete)
lembretes.route('/find').post(LembretesCtrl.apiFindMyLembretes)
lembretes.route('/find/sidebar').post(LembretesCtrl.apiFindMyLembretesSidebar)
lembretes.route('/delete').post(LembretesCtrl.apiDeleteLembrete)

export default lembretes