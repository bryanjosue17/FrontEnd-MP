import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFiscalia, deleteFiscalia } from "../store/actions/fiscalias";
import FiscaliaDataService from "../services/fiscalia.service";
const Fiscalia = (props) => {
  const initialFiscaliaState = {
    id: null,
    agencia: "",
    codigo: "",
    direccion: "",
    telefono: "",
  };
  const [currentFiscalia, setCurrentFiscalia] = useState(initialFiscaliaState);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const getFiscalia = (id) => {
    FiscaliaDataService.get(id)
      .then((response) => {
        setCurrentFiscalia(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getFiscalia(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFiscalia({ ...currentFiscalia, [name]: value });
  };

  const updateContent = () => {
    dispatch(updateFiscalia(currentFiscalia.id_fiscalia, currentFiscalia))
      .then((response) => {
        console.log(response);
        setMessage("La información se ha actualizado correctamente");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const removeFiscalia = () => {
    dispatch(deleteFiscalia(currentFiscalia.id_fiscalia))
      .then(() => {
        props.history.push("/fiscalias");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentFiscalia ? (
        <div className="edit-form">
          <h4>Fiscalía</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Agencia</label>
              <input
                type="text"
                className="form-control"
                id="agencia"
                name="agencia"
                value={currentFiscalia.agencia}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Codigo</label>
              <input
                type="text"
                className="form-control"
                id="codigo"
                name="codigo"
                value={currentFiscalia.codigo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                value={currentFiscalia.direccion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={currentFiscalia.telefono}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeFiscalia}>
            Eliminar
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Actualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Seleccione una fiscalía</p>
        </div>
      )}
    </div>
  );
};
export default Fiscalia;
