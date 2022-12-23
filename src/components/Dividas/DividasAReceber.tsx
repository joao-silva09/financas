import { Delete, MonetizationOn } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Tooltip,
  useTheme,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  DeleteDivida,
  GetDividasAReceber,
} from "../../store/slices/Divida.store";
import { themeTokens } from "../../themes";
import CustomNoRowsOverlay from "../CustomNoRowsOverlay";
import DialogExcluirDivida from "./DialogExcluirDivida";
import DialogPagarDivida from "./DialogPagarDivida";

export default function DividasAReceber() {
  const columnsDividas: GridColumns = [
    {
      field: "actions",
      headerName: "Opções",
      type: "actions",
      minWidth: 50,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row.id}
          icon={
            <Tooltip title="Pagar Dívida">
              <MonetizationOn fontSize="medium" />
            </Tooltip>
          }
          label="Pagar"
          color="success"
          onClick={() => handleOpenDialogPagarDivida(params.row.id)}
        />,
        <GridActionsCellItem
          key={params.row.id}
          icon={
            <Tooltip title="Excluir dívida">
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
      field: "titulo",
      headerName: "Título",
      minWidth: 132,
    },
    {
      field: "nomeDevedor",
      headerName: "Nome",
      minWidth: 133,
    },
    {
      field: "valor",
      headerName: "Valor",
      minWidth: 70,
      renderCell: (params) =>
        `${params.row.valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}`,
    },
    {
      field: "dataVencimento",
      headerName: "Vencimento",
      minWidth: 85,
      renderCell: (params) => {
        return params.row.dataVencimento === "0001-01-01T00:00:00"
          ? ""
          : new Date(params.row.dataVencimento).toLocaleDateString() ?? "";
      },
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetDividasAReceber());
  }, []);

  const dividas = useSelector(
    (root: RootState) => root.dividasStore.dividasAReceber
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

  const [isOpenDialogPagarDivida, setIsOpenDialogPagarDivida] = useState(false);
  const handleOpenDialogPagarDivida = (id) => {
    setIdDivida(id);
    setTimeout(() => setIsOpenDialogPagarDivida(true), 60);
  };
  const handleCloseDialogPagarDivida = () => {
    setIsOpenDialogPagarDivida(false);
  };

  const theme = useTheme();
  const colors = themeTokens(theme.palette.mode);

  return (
    <Card sx={{ backgroundColor: "#008148" }}>
      <CardHeader title="A Receber" subheader="Dívidas a serem recebidas" />
      <Divider />
      <Box p={3}>
        <DataGrid
          sx={{ backgroundColor: theme.palette.background.paper }}
          density="compact"
          autoHeight
          columns={columnsDividas}
          hideFooter
          getRowId={(row) => row.id}
          disableSelectionOnClick
          disableColumnSelector
          pageSize={20}
          rows={dividas.data ?? []}
          components={{ NoRowsOverlay: CustomNoRowsOverlay }}
        />
      </Box>
      <DialogExcluirDivida
        onClose={handleCloseDialogExcluirDivida}
        open={isOpenDialogExcluirDivida}
        onConfirm={excluirDivida}
      />
      <DialogPagarDivida
        onClose={handleCloseDialogPagarDivida}
        open={isOpenDialogPagarDivida}
        idDivida={idDivida!}
      />
    </Card>
  );
}
