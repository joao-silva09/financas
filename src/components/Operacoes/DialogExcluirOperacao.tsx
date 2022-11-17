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
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

type DialogExcluirOperacaoProps = {
  open: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
};

export default function DialogExcluirOperacao({
  open,
  onClose,
  onConfirm,
}: DialogExcluirOperacaoProps) {
  return (
    <Dialog sx={{ mb: 8 }} open={open} onClose={onClose} fullWidth>
      <DialogTitle>Excluir Operação</DialogTitle>
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
        <DialogContentText>Deseja realmente excluir esta operação?</DialogContentText>
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
