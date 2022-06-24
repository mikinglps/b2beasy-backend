import express from 'express'
import LogCtrl from './Log.controller.js'

const route = express.Router()
route.route('/').post(LogCtrl.apiAddLog)
route.route('/').get(LogCtrl.apiFindLogs)

export default route