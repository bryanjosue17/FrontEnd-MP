import http from "../http-common";

class FiscaliaDataService {
  getAll() {
    return http.get("/fiscalias");
  }

  get(id) {
    return http.get(`/fiscalias/${id}`);
  }

  create(data) {
    return http.post("/fiscalias", data);
  }

  update(id, data) {
    return http.put(`/fiscalias/${id}`, data);
  }

  delete(id) {
    return http.delete(`/fiscalias/${id}`);
  }

  deleteAll() {
    return http.delete(`/fiscalias`);
  }

  findByAgencia(agencia) {
    return http.get(`/fiscalias?agencia=${agencia}`);
  }
}

export default new FiscaliaDataService();