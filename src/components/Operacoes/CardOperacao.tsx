import { More, MoreVert } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Menu,
  MenuItem,
  Chip,
  useTheme,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetContaDto,
  Banco,
  GetOperacaoDto,
  TipoDivida,
  TipoOperacao,
} from "../../services/api";
import { RootState } from "../../store";
import { DeleteConta, GetContaById } from "../../store/slices/Conta.store";
import { DeleteOperacao } from "../../store/slices/Operacao.store";
import { verificarBanco } from "../../utils/verificarBanco";
import { verificarCorBanco } from "../../utils/verificarCorBanco";
import DialogExcluirOperacao from "./DialogExcluirOperacao";
import DialogCriarConta from "./DialogNovaOperacao";

export default function CardConta(data: GetOperacaoDto) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const conta = useSelector((root: RootState) => root.contaStore.conta);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isOpenDialogExcluirOperacao, setIsOpenDialogExcluirOperacao] =
    useState(false);
  const handleOpenDialogExcluirOperacao = () =>
    setIsOpenDialogExcluirOperacao(!isOpenDialogExcluirOperacao);
  const excluirOperacao = () => {
    dispatch(DeleteOperacao(data.id!));
    handleOpenDialogExcluirOperacao();
    handleClose();
  };

  const [isOpenDialogEditarOperacao, setIsOpenDialogEditarOperacao] =
    useState(false);
  const handleOpenDialogEditarOperacao = () => {
    setIsOpenDialogEditarOperacao(true);
  };

  const handleCloseDialogEditarOperacao = () => {
    setIsOpenDialogEditarOperacao(false);
  };

  return (
    <Card
      sx={{
        backgroundColor:
          data.tipoOperacao === TipoOperacao.Gasto ? "#FD2127" : "#0D8751",
      }}
    >
      <CardHeader title={data.titulo} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          right: 5,
          bottom: 58,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClick}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>
      <CardContent>
        <Typography variant="body2" color="-moz-initial">
          Valor:{" "}
          {`${data.valor!.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}`}
        </Typography>
        <Typography variant="body2" color="-moz-initial">
          Data: {new Date(data.dataOperacao!).toLocaleDateString()}
        </Typography>
        <Tooltip title={`Saldo da conta: R$ ${data.conta?.saldo}`}>
          <Typography variant="body2" color="-moz-initial">
            Conta: {`${data.conta?.titulo}`}
          </Typography>
        </Tooltip>
      </CardContent>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenDialogEditarOperacao}>
          Atualizar informações
        </MenuItem>
        <MenuItem onClick={handleOpenDialogExcluirOperacao}>
          Excluir Operação
        </MenuItem>
      </Menu>
      <DialogExcluirOperacao
        onClose={handleOpenDialogExcluirOperacao}
        open={isOpenDialogExcluirOperacao}
        onConfirm={excluirOperacao}
      />
      {/* <DialogEditarOperacao
        onClose={handleCloseDialogEditarOperacao}
        open={isOpenDialogEditarOperacao}
        closeMenu={handleClose}
        data={data}
      /> */}
    </Card>
  );
}
