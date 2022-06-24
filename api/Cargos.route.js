import CargosCtrl from "./Cargos.controller.js";
import express from "express";

const cargos = express.Router()

cargos.route('/').get(CargosCtrl.apiFindCargo)
cargos.route('/add').post(CargosCtrl.apiAddCargo)
cargos.route('/delete').post(CargosCtrl.apiDeleteCargo)
cargos.route('/setor').post(CargosCtrl.apiFindCargoOnSetor)
cargos.route('/id').post(CargosCtrl.apiFindCargoById)
cargos.route('/edit').post(CargosCtrl.apiUpdateCargo)
export default cargos