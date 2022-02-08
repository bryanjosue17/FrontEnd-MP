import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFiscalia, deleteFiscalia } from "../store/actions/fiscalias";
import FiscaliaDataService from "../services/fiscalia.service";
import { Guatemala } from "../const/guatemala";
import { useToasts } from "react-toast-notifications";

const Fiscalia = (props) => {
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
  const [currentFiscalia, setCurrentFiscalia] = useState(initialFiscaliaState);
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

  const getFiscalia = async (id) => {
    let response = await FiscaliaDataService.get(id);
    if (response.success) {
    }
    let datos = response.data;
    await handleSelectChange({
      target: {
        name: "municipio",
        value: datos.departamento,
      },
    });
    setCurrentFiscalia(datos);
  };

  useEffect(() => {
    getFiscalia(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFiscalia({ ...currentFiscalia, [name]: value });
  };
  const handleSelectChange = async (event) => {
    const { name, value } = event.target;
    setCurrentFiscalia({ ...currentFiscalia, [name]: value });
    let data = Guatemala[value];
    setTown(data);
  };
  const updateContent = () => {
    dispatch(updateFiscalia(currentFiscalia.id_fiscalia, currentFiscalia))
      .then(() => {
        addToast("La información se ha actualizado correctamente.", {
          appearance: "info",
          autoDismiss: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const removeFiscalia = () => {
    dispatch(deleteFiscalia(currentFiscalia.id_fiscalia))
      .then(() => {
        addToast("La información se ha eliminado correctamente.", {
          appearance: "error",
          autoDismiss: true,
        });
        props.history.push("/fiscalias");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <div className="edit-form">
        <h4>Detalle de la fiscalía</h4>
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
            <label>Tipo:</label>
            <select
              className="form-control"
              name="tipo"
              value={currentFiscalia.tipo}
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
                  value={currentFiscalia.departamento}
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
                  defaultValue={currentFiscalia.municipio}
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
              name="telefono"
              value={currentFiscalia.telefono}
              onChange={handleInputChange}
            />
          </div>
        </form>

        <button className="btn btn-danger btn-sm mr-2" onClick={removeFiscalia}>
          Eliminar
        </button>
        <button
          type="submit"
          className="btn btn-success btn-sm"
          onClick={updateContent}
        >
          Actualizar
        </button>
      </div>
    </div>
  );
};
export default Fiscalia;
