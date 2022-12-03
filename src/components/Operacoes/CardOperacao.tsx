import { Delete, Edit, ExpandMore, More, MoreVert } from "@mui/icons-material";
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
  AccordionSummary,
  AccordionDetails,
  Accordion,
  AccordionActions,
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

  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{
          backgroundColor:
            data.tipoOperacao === TipoOperacao.Gasto ? "#FD2127" : "#0D8751",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>{data.titulo}</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
          <Tooltip
            title={`Saldo da conta: ${data.conta!.saldo!.toLocaleString(
              "pt-br",
              {
                style: "currency",
                currency: "BRL",
              }
            )}`}
          >
            <Typography variant="body2" color="-moz-initial">
              Conta: {`${data.conta?.titulo}`}
            </Typography>
          </Tooltip>
        </AccordionDetails>
        <AccordionActions>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleOpenDialogEditarOperacao}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleOpenDialogExcluirOperacao}>
              <Delete />
            </IconButton>
          </Box>
        </AccordionActions>
      </Accordion>
      <DialogExcluirOperacao
        onClose={handleOpenDialogExcluirOperacao}
        open={isOpenDialogExcluirOperacao}
        onConfirm={excluirOperacao}
      />
      {/* <DialogEditarOperacao
        onClose={handleCloseDialogEditarOperacao}
        open={isOpenDialogEditarOperacao}
      /> */}
    </>
  );
}
