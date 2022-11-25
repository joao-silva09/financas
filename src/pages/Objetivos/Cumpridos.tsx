import {
  Add,
  AssignmentTurnedIn,
  AssignmentTurnedInOutlined,
  Delete,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  ButtonGroup,
  Button,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";
import DialogCriarObjetivo from "../../components/Objetivos/DialogCriarObjetivo";
import DialogExcluirObjetivo from "../../components/Objetivos/DialogExcluirObjetivo";
import { GetObjetivoDto } from "../../services/api";
import { RootState } from "../../store";
import {
  DeleteObjetivo,
  GetObjetivos,
  GetObjetivosCumpridos,
} from "../../store/slices/Objetivo.store";

export default function Cumpridos() {
  const columnsObjetivos: GridColumns = [
    {
      field: "actions",
      headerName: "Opções",
      type: "actions",
      minWidth: 100,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row.id}
          icon={
            <Tooltip title="Excluir objetivo">
              <Delete fontSize="medium" />
            </Tooltip>
          }
          label="Editar"
          color="error"
          onClick={() => handleOpenDialogExcluirObjetivo(params.row.id)}
        />,
      ],
    },
    {
      field: "titulo",
      headerName: "Título",
      minWidth: 230,
    },
    {
      field: "descricao",
      headerName: "Descrição",
      minWidth: 350,
    },
    {
      field: "valor",
      headerName: "Valor do Objetivo",
      minWidth: 150,
      renderCell: (params) =>
        `${params.row.valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}`,
    },
    {
      field: "conta.titulo",
      headerName: "Conta",
      minWidth: 170,
      renderCell: (params: GridRenderCellParams<any, GetObjetivoDto, any>) => {
        return <div>{params.row.conta?.titulo}</div>;
      },
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetObjetivosCumpridos());
  }, []);

  const [isOpenDialogExcluirObjetivo, setIsOpenDialogExcluirObjetivo] =
    useState(false);
  const [idObjetivo, setIdObjetivo] = useState();
  const handleOpenDialogExcluirObjetivo = (id) => {
    setIsOpenDialogExcluirObjetivo(true);
    setIdObjetivo(id);
  };
  const handleCloseDialogExcluirObjetivo = () => {
    setIsOpenDialogExcluirObjetivo(false);
  };

  const excluirObjetivo = () => {
    dispatch(DeleteObjetivo(idObjetivo!));
    setIsOpenDialogExcluirObjetivo(false);
  };

  const objetivos = useSelector((root: RootState) => root.objetivoStore);
  return (
    <Card>
      <CardHeader
        title="Objetivos cumpridos"
        subheader="Seus Objetivos que já foram cumpridos"
      />
      <Divider />
      <Box p={3}>
        {objetivos.objetivosCumpridos.data && (
          <DataGrid
            density="compact"
            autoHeight
            columns={columnsObjetivos}
            rows={objetivos.objetivosCumpridos.data ?? []}
            components={{ NoRowsOverlay: CustomNoRowsOverlay }}
            hideFooter
          />
        )}
      </Box>
      <DialogExcluirObjetivo
        onClose={handleCloseDialogExcluirObjetivo}
        open={isOpenDialogExcluirObjetivo}
        onConfirm={excluirObjetivo}
      />
    </Card>
  );
}
