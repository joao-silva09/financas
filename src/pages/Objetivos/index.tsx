import {
  Box,
  Card,
  CardHeader,
  Divider,
  ButtonGroup,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";
import DialogCriarObjetivo from "../../components/Objetivos/DialogCriarObjetivo";
import { RootState } from "../../store";
import { GetObjetivos } from "../../store/slices/Objetivo.store";

const columnsObjetivos: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    minWidth: 50,
  },
  {
    field: "titulo",
    headerName: "Título",
    minWidth: 150,
  },
  {
    field: "descricao",
    headerName: "Descrição",
    minWidth: 300,
  },
  {
    field: "valor",
    headerName: "valor",
    minWidth: 180,
    renderCell: (params) => `R$ ${params.row.valor}`,
  },
  {
    field: "isCumprido",
    headerName: "Cumprido",
    renderCell: (params) => (params.row.isCumprido ? "Sim" : "Não"),
  },
];

export default function Objetivos() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetObjetivos());
  }, []);

  const [isOpenDialogCriarObjetivo, setIsOpenDialogCriarObjetivo] =
    useState(false);
  const handleOpenDialogCriarObjetivo = () =>
    setIsOpenDialogCriarObjetivo(!isOpenDialogCriarObjetivo);

  const objetivos = useSelector((root: RootState) => root.objetivoStore);
  return (
    <Card>
      <CardHeader title="Objetivos" subheader="Seus Objetivos atuais" />
      <Divider />
      <Box p={3}>
        {objetivos.objetivos.data && (
          <DataGrid
            density="compact"
            autoHeight
            columns={columnsObjetivos}
            rows={objetivos.objetivos.data ?? []}
            components={{ NoRowsOverlay: CustomNoRowsOverlay }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <ButtonGroup variant="contained" color="primary">
          <Button onClick={handleOpenDialogCriarObjetivo} variant="contained">
            Adicionar Objetivo
          </Button>
        </ButtonGroup>
      </Box>
      <DialogCriarObjetivo
        onClose={handleOpenDialogCriarObjetivo}
        open={isOpenDialogCriarObjetivo}
      />
    </Card>
  );
}
