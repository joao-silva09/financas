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
  Grid,
  TextField,
  Autocomplete,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddContaDto, Banco } from "../../services/api";
import { PostConta } from "../../store/slices/Conta.store";
import * as Yup from "yup";
import { bancosOptions } from "../../utils/bancosOptions";

type DialogCriarContaProps = {
  open: boolean;
  onClose: VoidFunction;
};

export default function DialogCriarConta({
  open,
  onClose,
}: DialogCriarContaProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    titulo: Yup.string().required("Este campo é obrigatório!"),
    banco: Yup.string().required("Este campo é obrigatório!"),
    saldo: Yup.number().required("Este campo é obrigatório!"),
  });

  const formik = useFormik({
    initialValues: {} as AddContaDto,
    validationSchema: formSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        dispatch(PostConta(values));
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
    handleBlur,
    touched,
    isValid,
    dirty,
  } = formik;
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle>Criar Conta</DialogTitle>
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
                  required
                  fullWidth
                  label="Título"
                  name="titulo"
                  onChange={(e) => setFieldValue("titulo", e.target.value)}
                  value={values.titulo}
                  onBlur={handleBlur}
                  error={touched.titulo && Boolean(errors.titulo)}
                  helperText={touched.titulo && errors.titulo}
                />
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  fullWidth
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
                  onBlur={handleBlur}
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
                        required
                        label="Banco"
                        name="banco"
                        autoComplete="off"
                        error={touched.banco && Boolean(errors.banco)}
                        helperText={touched.banco && errors.banco}
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
                  required
                  type="number"
                  name="saldo"
                  label="Saldo inicial"
                  onChange={(e) => setFieldValue("saldo", e.target.value)}
                  onBlur={handleBlur}
                  value={values.saldo}
                  error={touched.saldo && Boolean(errors.saldo)}
                  helperText={touched.saldo && errors.saldo}
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
                onClick={onClose}
                color="primary"
              >
                Fechar
              </Button>
              <Button
                type="submit"
                disabled={!isValid || !dirty}
                endIcon={<Logout />}
                variant="contained"
                color="primary"
              >
                Criar Conta
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
