import express from 'express'
import FiliaisCtrl from './Filiais.controller.js'

const filial = express.Router()

filial.route('/').post(FiliaisCtrl.apiAddFilial)
filial.route('/').get(FiliaisCtrl.apiFindAllFiliais)
filial.route('/query').get(FiliaisCtrl.apiFindFilialNoPage)
filial.route('/select').post(FiliaisCtrl.apiFindSelectedFilial)
filial.route('/').put(FiliaisCtrl.apiEditMemo)
filial.route('/my').post(FiliaisCtrl.apiFindMyFilial)
filial.route('/delete').post(FiliaisCtrl.apiDeleteFilial)
filial.route('/edit').post(FiliaisCtrl.apiEditFilial)

export default filial