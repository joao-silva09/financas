import { Close, Delete, Logout, Paid } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ButtonGroup,
  IconButton,
  TextField,
  Grid,
  Autocomplete,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PagarDivida } from "../../store/slices/Divida.store";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RootState } from "../../store";

type DialogPagarDividaProps = {
  open: boolean;
  onClose: VoidFunction;
  //   onConfirm: VoidFunction;
  idDivida: number;
};

export default function DialogPagarDivida({
  open,
  onClose,
  //   onConfirm,
  idDivida,
}: DialogPagarDividaProps) {
  const dispatch = useDispatch();

  const contas = useSelector((root: RootState) => root.contaStore);

  const formSchema = Yup.object().shape({
    conta: Yup.string().required("Este campo é obrigatório!"),
  });

  const formik = useFormik({
    initialValues: { contaId: 0 },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        dispatch(PagarDivida(idDivida, values.contaId));
        onClose();
        resetForm();
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setFieldValue,
    resetForm,
    touched,
    isValid,
    dirty,
  } = formik;

  return (
    <Dialog sx={{ mb: 8 }} open={open} onClose={onClose} fullWidth>
      <DialogTitle>Pagar Dívida</DialogTitle>
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
          Escolha a conta irá pagar ou receber o valor da dívida
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <Grid container justifyContent="center">
          <Grid item xs={11}>
            <Autocomplete
              fullWidth
              isOptionEqualToValue={(option, value) => value === option}
              options={contas.contas.data ?? []}
              autoHighlight
              disableListWrap
              getOptionLabel={(option) => option.titulo!}
              onChange={(event, value) => {
                setFieldValue("contaId", value?.id);
                console.log(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Conta"
                  autoComplete="off"
                  error={Boolean(errors.contaId)}
                  helperText={errors.contaId}
                />
              )}
            />
          </Grid>
        </Grid>
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
            endIcon={<Paid />}
            variant="contained"
            onClick={() => {
              dispatch(PagarDivida(idDivida, values.contaId));
              onClose();
            }}
            color="primary"
          >
            Pagar Dívida
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
