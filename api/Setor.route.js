import express from 'express'
import SetorCtrl from './Setor.controller.js';

const setorR = express.Router();

setorR.route('/').get(SetorCtrl.apiFindSector)
setorR.route('/query').get(SetorCtrl.apiFindSectorNoPage)
setorR.route('/id').post(SetorCtrl.apiFindNomeById)
setorR.route('/').post(SetorCtrl.apiAddFilial)
setorR.route('/filial/').post(SetorCtrl.apiFindSectorOnFilial)
setorR.route('/delete').post(SetorCtrl.apiDeleteSetor)
setorR.route('/edit').post(SetorCtrl.apiEditSetor)

export default setorR