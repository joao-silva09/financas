import { Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  ButtonGroup,
  Button,
  Grid,
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
import DialogExcluirDivida from "../../components/Dividas/DialogExcluirDivida";
import DividasAPagar from "../../components/Dividas/DividasAPagar";
import DividasAReceber from "../../components/Dividas/DividasAReceber";
import DialogCriarObjetivo from "../../components/Objetivos/DialogCriarObjetivo";
import { GetContaDto, GetDividaDto } from "../../services/api";
import { RootState } from "../../store";
import { DeleteDivida, GetDividasPagas } from "../../store/slices/Divida.store";
import { GetObjetivos } from "../../store/slices/Objetivo.store";

export default function Pagas() {
  const columnsDividas: GridColumns = [
    {
      field: "actions",
      headerName: "Opções",
      type: "actions",
      minWidth: 40,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row.id}
          icon={
            <Tooltip title="Editar informações">
              <Delete fontSize="medium" />
            </Tooltip>
          }
          label="Editar"
          color="error"
          onClick={() => handleOpenDialogExcluirDivida(params.row.id)}
        />,
      ],
    },
    {
      field: "id",
      headerName: "id",
      minWidth: 150,
      hide: true,
    },
    {
      field: "titulo",
      headerName: "Título",
      minWidth: 150,
    },
    {
      field: "nomeDevedor",
      headerName: "Nome",
      minWidth: 150,
    },
    {
      field: "valor",
      headerName: "Valor",
      minWidth: 120,
      renderCell: (params) => `R$ ${params.row.valor}`,
    },
    {
      field: "dataVencimento",
      headerName: "Data Vencimento",
      minWidth: 130,
      renderCell: (params) => {
        return new Date(params.row.dataVencimento).toLocaleDateString();
      },
    },
    {
      field: "dataPagamento",
      headerName: "Data Pagamento",
      minWidth: 130,
      renderCell: (params) => {
        return new Date(params.row.dataPagamento).toLocaleDateString();
      },
    },
    {
      field: "conta.titulo",
      headerName: "Conta",
      minWidth: 110,
      renderCell: (params: GridRenderCellParams<any, GetDividaDto, any>) => {
        return <div>{params.row.conta?.titulo}</div>;
      },
    },
    {
      field: "tipoDivida",
      headerName: "Tipo",
      minWidth: 110,
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDividasPagas());
  }, []);

  const dividas = useSelector(
    (root: RootState) => root.dividasStore.dividasPagas
  );

  const [isOpenDialogExcluirDivida, setIsOpenDialogExcluirDivida] =
    useState(false);
  const [idDivida, setIdDivida] = useState();
  const handleOpenDialogExcluirDivida = (id) => {
    setIsOpenDialogExcluirDivida(true);
    setIdDivida(id);
  };
  const handleCloseDialogExcluirDivida = () => {
    setIsOpenDialogExcluirDivida(false);
  };

  const excluirDivida = () => {
    dispatch(DeleteDivida(idDivida!));
    setIsOpenDialogExcluirDivida(false);
  };

  return (
    <Card>
      <CardHeader
        title="Dívidas Pagas"
        subheader="Dívidas que já foram pagas ou recebidas"
      />
      <Divider />
      <Box p={3}>
        <DataGrid
          density="compact"
          autoHeight
          columns={columnsDividas}
          rows={dividas.data ?? []}
          components={{ NoRowsOverlay: CustomNoRowsOverlay }}
          hideFooter
          disableSelectionOnClick
        />
      </Box>
      <DialogExcluirDivida
        onClose={handleCloseDialogExcluirDivida}
        open={isOpenDialogExcluirDivida}
        onConfirm={excluirDivida}
      />
    </Card>
  );
}
