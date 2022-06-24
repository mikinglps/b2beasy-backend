import express from 'express';
import cors from 'cors';
import empresas from './api/Empresas.route.js';
import funcionarios from './api/Funcionarios.route.js';
import setorR from './api/Setor.route.js';
import filiais from './api/Filiais.route.js'
import logs from './api/Log.route.js'
import clientes from './api/Clientes.route.js'
import documentos from './api/Documentos.route.js';
import rascunhos from './api/Rascunhos.route.js';
import lembretes from './api/Lembretes.route.js'
import estoque from './api/Estoque.route.js';
import path from 'path'
import { fileURLToPath } from 'url';
import cargos from './api/Cargos.route.js';
import options from './api/Options.route.js';
import tarefas from './api/Tarefas.route.js';
import permissoes from './api/Permissoes.route.js';
import encaminhamentos from './api/Encaminhamentos.route.js';
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(cors())
app.use(express.json())
app.use("/api/v1/empresas", empresas)
app.use("/api/v1/funcionarios", funcionarios)
app.use("/api/v1/setor", setorR)
app.use("/api/v1/filiais", filiais)
app.use("/api/v1/logs", logs)
app.use("/api/v1/clientes", clientes)
app.use("/api/v1/documentos", documentos)
app.use("/api/v1/rascunhos", rascunhos)
app.use("/api/v1/lembretes", lembretes)
app.use("/api/v1/estoque", estoque)
app.use("/api/v1/cargos", cargos)
app.use("/api/v1/options", options)
app.use("/api/v1/tarefas", tarefas)
app.use("/api/v1/permissoes", permissoes)
app.use("/api/v1/encaminhamentos", encaminhamentos)
app.use('/public', express.static(__dirname + '/public'))
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app;