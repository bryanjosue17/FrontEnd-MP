import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFiscalia } from "../store/actions/fiscalias";
import moment from "moment";
const AddFiscalia = () => {
  const initialFiscaliaState = {
    id: null,
    agencia: "",
    codigo: "",
    direccion: "",
    telefono: "",
    datetime: "",
  };
  const [fiscalia, setFiscalia] = useState(initialFiscaliaState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFiscalia({ ...fiscalia, [name]: value });
  };
  const saveFiscalia = () => {
    const { agencia, codigo, direccion, telefono } = fiscalia;
    dispatch(
      createFiscalia(
        agencia,
        codigo,
        direccion,
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
          direccion: data.direccion,
          telefono: data.telefono,
          datetime: moment().format("lll"),
        });
        setSubmitted(true);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newFiscalia = () => {
    setFiscalia(initialFiscaliaState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>La información se ha insertado correctamente.</h4>
          <button className="btn btn-success" onClick={newFiscalia}>
            Agregar
          </button>
        </div>
      ) : (
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
            <label htmlFor="description">Dirección</label>
            <input
              type="text"
              className="form-control"
              id="direccion"
              required
              value={fiscalia.direccion}
              onChange={handleInputChange}
              name="direccion"
            />
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
      )}
    </div>
  );
};
export default AddFiscalia;
