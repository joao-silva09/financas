import { Close, Delete, Logout } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

type DialogExcluirObjetivoProps = {
  open: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
};

export default function DialogExcluirObjetivo({
  open,
  onClose,
  onConfirm,
}: DialogExcluirObjetivoProps) {
  return (
    <Dialog sx={{ mb: 8 }} open={open} onClose={onClose} fullWidth>
      <DialogTitle>Excluir Objetivo</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <DialogContentText>
          Deseja realmente Excluir este objetivo?
        </DialogContentText>
        <Typography variant="body2" color="-moz-initial">
          Esta ação não irá alterar o saldo de nenhuma conta, apenas irá excluir
          esse registro do histórico de objetivos.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <ButtonGroup>
          <Button
            endIcon={<Close />}
            variant="outlined"
            onClick={onClose}
            color="primary"
          >
            Fechar
          </Button>
          <Button
            endIcon={<Delete />}
            variant="contained"
            onClick={onConfirm}
            color="error"
          >
            Excluir
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
