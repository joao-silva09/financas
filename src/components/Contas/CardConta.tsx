import { MoreVert, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Box,
  Menu,
  MenuItem,
  Chip,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GetContaDto, Banco } from "../../services/api";
import { DeleteConta } from "../../store/slices/Conta.store";
import { verificarBanco } from "../../utils/verificarBanco";
import { verificarCorBanco } from "../../utils/verificarCorBanco";
import DialogEditarConta from "./DialogEditarConta";
import DialogExcluirConta from "./DialogExcluirConta";

export default function CardConta(data: GetContaDto) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isSaldoVisible, setIsSaldoVisible] = useState(false);

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
    dispatch(DeleteConta(data.id!, data.titulo));
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
      <CardHeader
        title={<Typography variant="h6">{data.titulo}</Typography>}
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVert />
          </IconButton>
        }
        subheader={
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="-moz-initial">
              {isSaldoVisible ? (
                <>
                  <Typography variant="body1" color="-moz-initial">
                    Saldo:
                    {` ${data.saldo!.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}`}
                  </Typography>
                </>
              ) : (
                <>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" color="-moz-initial">
                      Saldo:
                    </Typography>
                    <Box
                      sx={{
                        ml: 0.7,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        width: "80px",
                        height: "16px",
                      }}
                    />
                  </Box>
                </>
              )}
            </Typography>

            <IconButton
              onClick={() => setIsSaldoVisible(!isSaldoVisible)}
              sx={{ mx: 0.5 }}
            >
              {isSaldoVisible ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </Box>
        }
      />
      <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
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
