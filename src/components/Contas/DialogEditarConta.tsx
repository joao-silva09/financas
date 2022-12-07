import { Check, Close, Logout } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ButtonGroup,
  IconButton,
  Grid,
  TextField,
  Box,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddContaDto, UpdateContaDto } from "../../services/api";
import { PostConta, PutConta } from "../../store/slices/Conta.store";
import * as Yup from "yup";
import { bancosOptions } from "../../utils/bancosOptions";

type DialogEditarContaProps = {
  open: boolean;
  onClose: VoidFunction;
  closeMenu: VoidFunction;
  data: UpdateContaDto;
};

export default function DialogEditarConta({
  open,
  onClose,
  closeMenu,
  data,
}: DialogEditarContaProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    titulo: Yup.string().required("Este campo é obrigatório!"),
    banco: Yup.string().required("Este campo é obrigatório!"),
    saldo: Yup.number().required("Este campo é obrigatório!"),
  });

  const formik = useFormik({
    initialValues: {
      titulo: data.titulo,
      banco: data.banco,
      saldo: data.saldo,
    } as UpdateContaDto,
    validationSchema: formSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        let dto = values as UpdateContaDto;
        dto.id = data.id;
        dispatch(PutConta(dto));
        resetForm();
        closeMenu();
        onClose();
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
    <Dialog open={open} onClose={onClose} fullWidth>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <DialogTitle>Editar Conta</DialogTitle>
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
            <Grid container rowSpacing={4} justifyContent="center" pt={2}>
              <Grid item xs={8}>
                <TextField
                  type="text"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  label="Título"
                  onChange={(e) => setFieldValue("titulo", e.target.value)}
                  value={values.titulo}
                  error={Boolean(errors.titulo)}
                  helperText={errors.titulo}
                />
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  fullWidth
                  value={bancosOptions.find((f) => f.label === values.banco)}
                  isOptionEqualToValue={(option, value) =>
                    value.label === option.label
                  }
                  options={bancosOptions}
                  autoHighlight
                  disableListWrap
                  getOptionLabel={(option) => option.label.replaceAll("_", " ")}
                  onChange={(event, value) =>
                    setFieldValue("banco", value?.label)
                  }
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="28"
                        src={option.icon}
                        srcSet={option.icon}
                        alt=""
                      />
                      {option.label.replaceAll("_", " ")}
                    </Box>
                  )}
                  renderInput={(params) => {
                    const inputProps = params.inputProps;
                    inputProps.autoComplete = "off";
                    return (
                      <TextField
                        {...params}
                        label="Banco"
                        autoComplete="off"
                        error={Boolean(errors.banco)}
                        helperText={errors.banco}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  type="number"
                  label="Saldo inicial"
                  onChange={(e) => setFieldValue("saldo", e.target.value)}
                  value={values.saldo}
                  error={Boolean(errors.saldo)}
                  helperText={errors.saldo}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <ButtonGroup>
              <Button
                endIcon={<Close />}
                variant="outlined"
                onClick={() => {
                  onClose();
                  resetForm();
                  closeMenu();
                }}
                color="primary"
              >
                Fechar
              </Button>
              <Button
                type="submit"
                disabled={!isValid || !dirty}
                endIcon={<Check />}
                variant="contained"
                color="primary"
              >
                Confirmar
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
