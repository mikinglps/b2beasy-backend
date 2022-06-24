import EmpresasDAO from '../dao/EmpresasDAO.js';

export default class EmpresasCtrl {
    static async apiGetEmpresas(req, res, next) {
        const empresaPorPagina = req.query.empresaPorPagina ? parseInt(req.query.empresaPorPagina, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.cnpj){
            filters.cnpj = req.query.cnpj
        }else if(req.query.nome){
            filters.nome = req.query.nome
        }

        const { listaEmpresas, totalNumEmpresas } = await EmpresasDAO.getEmpresas({
            filters,
            page,
            empresaPorPagina,
        })

        let response = {
            empresas: listaEmpresas,
            page: page,
            filters: filters,
            entries_per_page: empresaPorPagina,
            total_results: totalNumEmpresas,
        }
        res.json(response)
    }
}