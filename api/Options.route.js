import OptionsCtrl from "./Options.controller.js";
import express from "express";

const options = express.Router();

options.route('/').post(OptionsCtrl.apiAddOption)
options.route('/').get(OptionsCtrl.apiFindLast)

export default options