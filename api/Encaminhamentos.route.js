import EncaminhamentosCtrl from "./Encaminhamentos.controller.js";
import express from "express";

const encaminhamentos = express.Router();

encaminhamentos.route('/novo').post(EncaminhamentosCtrl.apiAddEncaminhamento)
encaminhamentos.route('/find').post(EncaminhamentosCtrl.apiFindEncaminhamento)

export default encaminhamentos