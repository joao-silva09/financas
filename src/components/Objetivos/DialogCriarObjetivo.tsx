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
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddContaDto, AddObjetivoDto } from "../../services/api";
import { PostConta } from "../../store/slices/Conta.store";
import * as Yup from "yup";
import { PostObjetivo } from "../../store/slices/Objetivo.store";

type DialogCriarObjetivoProps = {
  open: boolean;
  onClose: VoidFunction;
};

export default function DialogCriarObjetivo({
  open,
  onClose,
}: DialogCriarObjetivoProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    titulo: Yup.string().required("Este campo é obrigatório!"),
    descricao: Yup.string().required("Este campo é obrigatório!"),
    valor: Yup.number().required("Este campo é obrigatório!"),
  });

  const formik = useFormik({
    initialValues: {} as AddObjetivoDto,
    validationSchema: formSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        dispatch(PostObjetivo(values));
        onClose();
        resetForm();
      } catch (error: any) {
        console.log("deu pau");
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
          <DialogTitle>Adicionar Objetivo</DialogTitle>
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
                <TextField
                  fullWidth
                  label="Descrição"
                  multiline
                  onChange={(e) => setFieldValue("descricao", e.target.value)}
                  value={values.descricao}
                  error={Boolean(errors.descricao)}
                  helperText={errors.descricao}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  type="number"
                  label="Valor do Objetivo"
                  onChange={(e) => setFieldValue("valor", e.target.value)}
                  value={values.valor}
                  error={Boolean(errors.valor)}
                  helperText={errors.valor}
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
                Criar Objetivo
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
