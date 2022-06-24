import app from './server.js'
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import EmpresasDAO from './dao/EmpresasDAO.js';
import FuncionariosDAO from './dao/FuncionariosDAO.js';
import SetorDAO from './dao/SetorDAO.js';
import FiliaisDAO from './dao/FiliaisDAO.js';
import LogDAO from './dao/LogDAO.js';
import ClientesDAO from './dao/ClientesDAO.js';
import DocumentosDAO from './dao/DocumentosDAO.js';
import RascunhosDAO from './dao/RascunhosDAO.js'
import LembretesDAO from './dao/LembretesDAO.js';
import EstoqueDAO from './dao/EstoqueDAO.js';
import CargosDAO from './dao/CargosDAO.js';
import OptionsDAO from './dao/OptionsDAO.js';
import TarefasDAO from './dao/TarefasDAO.js';
import PermissoesDAO from './dao/PermissoesDAO.js';
import EncaminhamentosDAO from './dao/EncaminhamentosDAO.js';

dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000
MongoClient.connect(process.env.EMPRESAS_DB_URI
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await EmpresasDAO.injectDB(client)
    await FuncionariosDAO.injectDB(client)
    await SetorDAO.injectDB(client)
    await FiliaisDAO.injectDB(client)
    await LogDAO.injectDB(client)
    await ClientesDAO.injectDB(client)
    await DocumentosDAO.injectDB(client)
    await RascunhosDAO.injectDB(client)
    await LembretesDAO.injectDB(client)
    await EstoqueDAO.injectDB(client)
    await CargosDAO.injectDB(client)
    await OptionsDAO.injectDB(client)
    await TarefasDAO.injectDB(client)
    await PermissoesDAO.injectDB(client)
    await EncaminhamentosDAO.injectDB(client)
    app.listen(port, () => {console.log(`listening on port ${port}`)})
})