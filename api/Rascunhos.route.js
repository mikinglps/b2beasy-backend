import express from 'express'
import RascunhosCtrl from './Rascunhos.controller.js'

const rascunhos = express.Router()

rascunhos.route('/add').post(RascunhosCtrl.apiAddRascunho)
rascunhos.route('/find').post(RascunhosCtrl.apiFindMyRascunhos)
rascunhos.route('/id').post(RascunhosCtrl.apiFindRascunhoById)

export default rascunhos