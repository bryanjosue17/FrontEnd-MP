import {
  CREATE_FISCALIA,
  RETRIEVE_FISCALIAS,
  RETRIEVE_FISCALIA,
  UPDATE_FISCALIA,
  DELETE_FISCALIA,
  DELETE_ALL_FISCALIAS,
} from "./types";
import FiscaliaDataService from "../../services/fiscalia.service";

export const createFiscalia =
  (agencia, codigo, tipo, departamento, municipio, telefono, datetime) =>
  async (dispatch) => {
    try {
      const res = await FiscaliaDataService.create({
        agencia,
        codigo,
        tipo,
        departamento,
        municipio,
        telefono,
        datetime,
      });
      dispatch({
        type: CREATE_FISCALIA,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
export const retrieveFiscalias = () => async (dispatch) => {
  try {
    const res = await FiscaliaDataService.getAll();
    dispatch({
      type: RETRIEVE_FISCALIAS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const retrieveFiscalia = (id) => async (dispatch) => {
  try {
    const res = await FiscaliaDataService.get(id);
    dispatch({
      type: RETRIEVE_FISCALIA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateFiscalia = (id, data) => async (dispatch) => {
  try {
    const res = await FiscaliaDataService.update(id, data);
    dispatch({
      type: UPDATE_FISCALIA,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteFiscalia = (id) => async (dispatch) => {
  try {
    await FiscaliaDataService.delete(id);
    dispatch({
      type: DELETE_FISCALIA,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
export const deleteAllFiscalias = () => async (dispatch) => {
  try {
    const res = await FiscaliaDataService.deleteAll();
    dispatch({
      type: DELETE_ALL_FISCALIAS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const findFiscaliasByAgencia = (agencia) => async (dispatch) => {
  try {
    const res = await FiscaliaDataService.findByAgencia(agencia);
    dispatch({
      type: RETRIEVE_FISCALIAS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
