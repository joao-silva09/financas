import { Delete } from "@mui/icons-material";
import { Box, Card, CardHeader, Divider, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";
import DialogExcluirDivida from "../../components/Dividas/DialogExcluirDivida";
import { GetDividaDto } from "../../services/api";
import { RootState } from "../../store";
import { DeleteDivida, GetDividasPagas } from "../../store/slices/Divida.store";

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
      field: "id",
      headerName: "id",
      minWidth: 150,
      hide: true,
    },
    {
      field: "titulo",
      headerName: "Título",
      minWidth: 190,
    },
    {
      field: "nomeDevedor",
      headerName: "Nome",
      minWidth: 160,
    },
    {
      field: "valor",
      headerName: "Valor da dívida",
      minWidth: 135,
      renderCell: (params) =>
        `${params.row.valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}`,
    },
    {
      field: "dataVencimento",
      headerName: "Data Vencimento",
      minWidth: 130,
      renderCell: (params) => {
        return params.row.dataVencimento === "0001-01-01T00:00:00"
          ? ""
          : new Date(params.row.dataVencimento).toLocaleDateString() ?? "";
      },
    },
    {
      field: "dataPagamento",
      headerName: "Data Pagamento",
      minWidth: 130,
      renderCell: (params) => {
        return params.row.dataPagamento === "0001-01-01T00:00:00"
          ? ""
          : new Date(params.row.dataPagamento).toLocaleDateString() ?? "";
      },
    },
    {
      field: "conta.titulo",
      headerName: "Conta",
      minWidth: 170,
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
