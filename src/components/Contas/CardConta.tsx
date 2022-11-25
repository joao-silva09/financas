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
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetContaDto, Banco } from "../../services/api";
import { RootState } from "../../store";
import { DeleteConta, GetContaById } from "../../store/slices/Conta.store";
import { verificarBanco } from "../../utils/verificarBanco";
import { verificarCorBanco } from "../../utils/verificarCorBanco";
import DialogCriarConta from "./DialogCriarConta";
import DialogEditarConta from "./DialogEditarConta";
import DialogExcluirConta from "./DialogExcluirConta";

export default function CardConta(data: GetContaDto) {
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

  const [isOpenDialogExcluirConta, setIsOpenDialogExcluirConta] =
    useState(false);
  const handleOpenDialogExcluirConta = () =>
    setIsOpenDialogExcluirConta(!isOpenDialogExcluirConta);
  const excluirConta = () => {
    dispatch(DeleteConta(data.id!));
    handleOpenDialogExcluirConta();
    handleClose();
  };

  const [isOpenDialogEditarConta, setIsOpenDialogEditarConta] = useState(false);
  const handleOpenDialogEditarConta = () => {
    setIsOpenDialogEditarConta(true);
  };

  const handleCloseDialogEditarConta = () => {
    setIsOpenDialogEditarConta(false);
  };

  return (
    <Card>
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
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" color="-moz-initial">
          Saldo:{" "}
          {`${data.saldo!.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}`}
        </Typography>
        <Chip
          avatar={<img width="20" src={verificarBanco(data.banco!)} />}
          sx={{
            backgroundColor: verificarCorBanco(data.banco!),
            px: 1,
            py: 2.3,
            fontWeight: "bold",
            color:
              data.banco === Banco.C6_bank ||
              data.banco === Banco.Sicoob ||
              data.banco === Banco.Nubank
                ? "white"
                : theme.palette.text.primary && data.banco === Banco.Sicredi
                ? "black"
                : theme.palette.text.primary,
          }}
          size="medium"
          label={data.banco?.replaceAll("_", " ")}
          variant="outlined"
        />
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
        <MenuItem onClick={handleOpenDialogEditarConta}>
          Atualizar informações
        </MenuItem>
        <MenuItem onClick={handleOpenDialogExcluirConta}>
          Excluir conta
        </MenuItem>
      </Menu>
      <DialogExcluirConta
        onClose={handleOpenDialogExcluirConta}
        open={isOpenDialogExcluirConta}
        onConfirm={excluirConta}
      />
      <DialogEditarConta
        onClose={handleCloseDialogEditarConta}
        open={isOpenDialogEditarConta}
        closeMenu={handleClose}
        data={data}
      />
    </Card>
  );
}
