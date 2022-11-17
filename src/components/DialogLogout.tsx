import { Close, Logout } from "@mui/icons-material";
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

type DialogLogoutProps = {
  open: boolean;
  onClose: VoidFunction;
  onLogout: VoidFunction;
};

export default function DialogLogout({
  open,
  onClose,
  onLogout,
}: DialogLogoutProps) {
  return (
    <Dialog sx={{ mb: 8 }} open={open} onClose={onClose} fullWidth>
      <DialogTitle>Sair</DialogTitle>
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
        <DialogContentText>Deseja realmente sair?</DialogContentText>
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
            endIcon={<Logout />}
            variant="contained"
            onClick={onLogout}
            color="primary"
          >
            Sair
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
