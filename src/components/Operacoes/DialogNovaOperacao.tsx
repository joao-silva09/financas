import { Add, Close, Logout } from "@mui/icons-material";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddContaDto,
  AddOperacaoDto,
  Banco,
  TipoDivida,
  TipoOperacao,
} from "../../services/api";
import { PostOperacao } from "../../store/slices/Operacao.store";
import * as Yup from "yup";
import { bancosOptions } from "../../utils/bancosOptions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/pt-BR";
import { RootState } from "../../store";

type DialogNovaOperacaoProps = {
  open: boolean;
  onClose: VoidFunction;
};

export default function DialogNovaOperacao({
  open,
  onClose,
}: DialogNovaOperacaoProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contas = useSelector((root: RootState) => root.contaStore);

  const formSchema = Yup.object().shape({
    titulo: Yup.string().required("Este campo é obrigatório!"),
    descricao: Yup.string().optional(),
    valor: Yup.number().required("Este campo é obrigatório!"),
    dataOperacao: Yup.date()
      .nullable()
      .required("Este campo é obrigatório!")
      .typeError("Data inválida")
      .transform((curr, orig) => (orig === "" ? null : curr)),
    tipoOperacao: Yup.string().required("Este campo é obrigatório!"),
  });

  const [contaId, setContaId] = useState<any>(0);

  const formik = useFormik({
    initialValues: {} as AddOperacaoDto,
    validationSchema: formSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        dispatch(PostOperacao(values, contaId!));
        onClose();
        resetForm();
      } catch (error: any) {
        console.log(error);
      }
    },
  });
  const onChangeDate = (field: any, value: any) => {
    setFieldValue(field, value);
  };
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
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle>Nova Operação</DialogTitle>
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
            <Grid
              container
              columnSpacing={3}
              rowSpacing={4}
              justifyContent="center"
              pt={2}
            >
              <Grid item xs={10}>
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
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel>Tipo Operação</InputLabel>
                  <Select
                    fullWidth
                    label="Tipo Operação"
                    value={values.tipoOperacao}
                    onChange={(e) =>
                      setFieldValue("tipoOperacao", e.target.value)
                    }
                    error={Boolean(errors.tipoOperacao)}
                  >
                    <MenuItem value={TipoOperacao.Gasto}>A Pagar</MenuItem>
                    <MenuItem value={TipoOperacao.Recebimento}>
                      A Receber
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="number"
                  label="Valor"
                  onChange={(e) => setFieldValue("valor", e.target.value)}
                  value={values.valor}
                  error={Boolean(errors.valor)}
                  helperText={errors.valor}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <Autocomplete
                  fullWidth
                  isOptionEqualToValue={(option, value) => value === option}
                  options={contas.contas.data ?? []}
                  autoHighlight
                  disableListWrap
                  getOptionLabel={(option) => option.titulo!}
                  onChange={(event, value) => {
                    setContaId(value!.id!);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Conta" autoComplete="off" />
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={locale}
                >
                  <DatePicker
                    value={
                      values.dataOperacao == undefined
                        ? null
                        : values.dataOperacao
                    }
                    label="Data Operação"
                    inputFormat="dd/MM/yyyy"
                    onChange={(value: any) =>
                      onChangeDate("dataOperacao", value)
                    }
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        fullWidth
                        error={Boolean(errors.dataOperacao)}
                        helperText={errors.dataOperacao}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Descrição"
                  onChange={(e) => setFieldValue("descricao", e.target.value)}
                  value={values.descricao}
                  error={Boolean(errors.descricao)}
                  helperText={errors.descricao}
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
                endIcon={<Add />}
                variant="contained"
                color="primary"
              >
                Nova Operação
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
