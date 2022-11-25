import { Add, Delete, Edit, MonetizationOn } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
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
  GetDividasAPagar,
  PagarDivida,
} from "../../store/slices/Divida.store";
import { themeTokens } from "../../themes";
import CustomNoRowsOverlay from "../CustomNoRowsOverlay";
import DialogCriarDivida from "./DialogCriarDivida";
import DialogEditarDivida from "./DialogEditarDivida";
import DialogExcluirDivida from "./DialogExcluirDivida";
import DialogPagarDivida from "./DialogPagarDivida";

export default function DividasAPagar() {
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
        return new Date(params.row.dataVencimento).toLocaleDateString();
      },
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDividasAPagar());
  }, []);
  const dividas = useSelector(
    (root: RootState) => root.dividasStore.dividasAPagar
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

  // const PagarDividas = () => {
  //   dispatch(PagarDivida(idDivida!));
  //   setIsOpenDialogPagarDivida(false);
  // };

  const theme = useTheme();
  const colors = themeTokens(theme.palette.mode);

  return (
    <Card sx={{ backgroundColor: "#FD151B" }}>
      <CardHeader title="A Pagar" subheader="Dívidas a serem pagas" />
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
          pageSize={20}
          disableColumnSelector
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
