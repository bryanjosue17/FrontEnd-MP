import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  retrieveFiscalias,
  findFiscaliasByAgencia,
  deleteAllFiscalias,
} from "../store/actions/fiscalias";
const FiscaliasList = () => {
  const [currentFiscalia, setCurrentFiscalia] = useState(null);
  const [searchAgencia, setSearchAgencia] = useState("");
  const fiscalias = useSelector((state) => state.fiscalias);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveFiscalias());
  }, [dispatch]);
  const onChangeSearchAgencia = (e) => {
    const searchAgencia = e.target.value;
    setSearchAgencia(searchAgencia);
  };
  const refreshData = () => {
    setCurrentFiscalia(null);
  };

  const removeAllFiscalias = () => {
    dispatch(deleteAllFiscalias())
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByAgencia = () => {
    refreshData();
    dispatch(findFiscaliasByAgencia(searchAgencia));
  };

  const columns = [
    {
      field: "agencia",
      headerName: "Agencia",
      sortable: true,
      width: 200,
    },
    {
      field: "codigo",
      headerName: "Codigo",
      sortable: true,
      width: 200,
    },
    {
      field: "direccion",
      headerName: "Dirección",
      sortable: true,
      width: 200,
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      sortable: true,
      width: 200,
    },
    {
      field: "datetime",
      headerName: "Fecha ingreso",
      sortable: true,
      width: 200,
    },
    {
      field: "action",
      headerName: "Acciones",
      renderCell: (params) => {
        return (
          <Link
            to={"/fiscalias/" + params.row.id_fiscalia}
            className="btn btn-warning btn-sm"
          >
            Editar
          </Link>
        );
      },
    },
  ];

  return (
    <div>
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por agencia"
            value={searchAgencia}
            onChange={onChangeSearchAgencia}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByAgencia}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <h4>Listado de Fiscalias</h4>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={fiscalias || []}
            columns={columns || []}
            disableSelectionOnClick
            getRowId={(row) => row.id_fiscalia}
            components={{
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  Sin resultados
                </Stack>
              ),
              NoResultsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  Sin resultados
                </Stack>
              ),
            }}
          />
        </div>
        {fiscalias.length === 0 ? (
          <></>
        ) : (
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllFiscalias}
          >
            Eliminar todas las fiscalías
          </button>
        )}
      </div>
    </div>
  );
};
export default FiscaliasList;
