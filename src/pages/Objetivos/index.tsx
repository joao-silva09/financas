import { Add, AssignmentTurnedIn, Delete } from "@mui/icons-material";
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
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";
import DialogCriarObjetivo from "../../components/Objetivos/DialogCriarObjetivo";
import DialogCumprirObjetivo from "../../components/Objetivos/DialogCumprirObjetivo";
import DialogExcluirObjetivo from "../../components/Objetivos/DialogExcluirObjetivo";
import { RootState } from "../../store";
import {
  DeleteObjetivo,
  GetObjetivos,
  GetObjetivosACumprir,
} from "../../store/slices/Objetivo.store";

export default function Objetivos() {
  const columnsObjetivos: GridColumns = [
    {
      field: "actions",
      headerName: "Opções",
      type: "actions",
      minWidth: 50,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row.id}
          icon={
            <Tooltip title="Cumprir Objetivo">
              <AssignmentTurnedIn fontSize="medium" />
            </Tooltip>
          }
          label="Cumprir"
          color="success"
          onClick={() => handleOpenDialogCumprirObjetivo(params.row.id)}
        />,
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
      minWidth: 250,
    },
    {
      field: "descricao",
      headerName: "Descrição",
      minWidth: 500,
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
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetObjetivosACumprir());
  }, []);

  const [isOpenDialogCriarObjetivo, setIsOpenDialogCriarObjetivo] =
    useState(false);
  const handleOpenDialogCriarObjetivo = () =>
    setIsOpenDialogCriarObjetivo(!isOpenDialogCriarObjetivo);

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

  const [isOpenDialogCumprirObjetivo, setIsOpenDialogCumprirObjetivo] =
    useState(false);
  const handleOpenDialogCumprirObjetivo = (id) => {
    setIdObjetivo(id);
    setTimeout(() => setIsOpenDialogCumprirObjetivo(true), 60);
  };
  const handleCloseDialogCumprirObjetivo = () => {
    setIsOpenDialogCumprirObjetivo(false);
  };

  const objetivos = useSelector((root: RootState) => root.objetivoStore);
  return (
    <Card>
      <CardHeader
        title="Objetivos a cumprir"
        subheader="Seus Objetivos que ainda não foram cumpridos"
      />
      <Divider />
      <Box p={3}>
        {objetivos.objetivosACumprir.data && (
          <DataGrid
            density="compact"
            autoHeight
            columns={columnsObjetivos}
            rows={objetivos.objetivosACumprir.data ?? []}
            components={{ NoRowsOverlay: CustomNoRowsOverlay }}
            hideFooter
          />
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <ButtonGroup variant="contained" color="primary">
          <Button
            endIcon={<Add />}
            onClick={handleOpenDialogCriarObjetivo}
            variant="contained"
          >
            Adicionar Objetivo
          </Button>
        </ButtonGroup>
      </Box>
      <DialogCriarObjetivo
        onClose={handleOpenDialogCriarObjetivo}
        open={isOpenDialogCriarObjetivo}
      />
      <DialogExcluirObjetivo
        onClose={handleCloseDialogExcluirObjetivo}
        open={isOpenDialogExcluirObjetivo}
        onConfirm={excluirObjetivo}
      />
      <DialogCumprirObjetivo
        onClose={handleCloseDialogCumprirObjetivo}
        open={isOpenDialogCumprirObjetivo}
        idObjetivo={idObjetivo!}
      />
    </Card>
  );
}
