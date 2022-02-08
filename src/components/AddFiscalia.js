import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createFiscalia } from "../store/actions/fiscalias";
import { Guatemala } from "../const/guatemala";
import { useToasts } from "react-toast-notifications";

import moment from "moment";
const AddFiscalia = () => {
  const initialFiscaliaState = {
    id: null,
    agencia: "",
    codigo: "",
    tipo: "",
    departamento: "",
    municipio: "",
    telefono: "",
    datetime: "",
  };
  const [fiscalia, setFiscalia] = useState(initialFiscaliaState);
  const [deptos, setDepto] = useState([]);
  const [towns, setTown] = useState([]);
  const { addToast } = useToasts();

  const dispatch = useDispatch();

  useEffect(() => {
    let data = [];
    for (let depto in Guatemala) {
      data.push({
        id: depto,
        value: depto,
      });
    }
    setDepto(data);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFiscalia({ ...fiscalia, [name]: value });
  };

  const handleSelectChange = async (event) => {
    const { name, value } = event.target;
    setFiscalia({ ...fiscalia, [name]: value });
    let data = Guatemala[value];
    setTown(data);
  };
  const saveFiscalia = () => {
    const { agencia, codigo, tipo, departamento, municipio, telefono } =
      fiscalia;
    dispatch(
      createFiscalia(
        agencia,
        codigo,
        tipo,
        departamento,
        municipio,
        telefono,
        moment().format("lll")
      )
    )
      .then((data) => {
        console.log(data);
        setFiscalia({
          id: data.id,
          agencia: data.agencia,
          codigo: data.codigo,
          tipo: data.tipo,
          departamento: data.departamento,
          municipio: data.municipio,
          telefono: data.telefono,
          datetime: moment().format("lll"),
        });
        addToast("La información se ha insertado correctamente.", {
          appearance: "success",
          autoDismiss: true,
        });
        setFiscalia(initialFiscaliaState);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
      <div>
        <h4>Inserte nueva fiscalía</h4>

        <div className="form-group">
          <label htmlFor="title">Agencia</label>
          <input
            type="text"
            className="form-control"
            id="agencia"
            required
            value={fiscalia.agencia}
            onChange={handleInputChange}
            name="agencia"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Codigo</label>
          <input
            type="text"
            className="form-control"
            id="codigo"
            required
            value={fiscalia.codigo}
            onChange={handleInputChange}
            name="codigo"
          />
        </div>
        <div className="form-group">
          <label>Tipo:</label>
          <select
            className="form-control"
            name="tipo"
            value={fiscalia.tipo}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una opción...</option>
            <option key={1} value={"Seccion"}>
              Seccion
            </option>
            <option key={2} value={"Municipal"}>
              Municipal
            </option>
            <option key={3} value={"Distrital"}>
              Distrital
            </option>
          </select>
        </div>
        <div className="form-group">
          <div className="form-row">
            <div className="col-md-6">
              <label>Departamento:</label>
              <select
                className="form-control"
                name="departamento"
                value={fiscalia.departamento}
                onChange={handleSelectChange}
                required
              >
                <option value="">Selecciona una opción...</option>
                {deptos.map((depto) => (
                  <option key={depto.id} value={depto.id}>
                    {depto.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label>Municipio:</label>
              <select
                className="form-control"
                name="municipio"
                defaultValue={fiscalia.municipio}
                onChange={handleInputChange}
                multiple={false}
                required
              >
                <option value="">Selecciona una opción...</option>
                {towns.map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            required
            value={fiscalia.telefono}
            onChange={handleInputChange}
            name="telefono"
          />
        </div>
        <button onClick={saveFiscalia} className="btn btn-success">
          Agregar
        </button>
      </div>
    </div>
  );
};
export default AddFiscalia;
