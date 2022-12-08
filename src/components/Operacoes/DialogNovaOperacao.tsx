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
  FormHelperText,
  useTheme,
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
import {
  GetOperacoesByMonth,
  PostOperacao,
} from "../../store/slices/Operacao.store";
import * as Yup from "yup";
import { bancosOptions } from "../../utils/bancosOptions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/pt-BR";
import { RootState } from "../../store";

type DialogNovaOperacaoProps = {
  open: boolean;
  onClose: VoidFunction;
  dateFilter: any;
};

export default function DialogNovaOperacao({
  open,
  onClose,
  dateFilter,
}: DialogNovaOperacaoProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

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
    handleBlur,
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
                  name="titulo"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  label="Título"
                  onChange={(e) => setFieldValue("titulo", e.target.value)}
                  onBlur={handleBlur}
                  value={values.titulo}
                  error={touched.titulo && Boolean(errors.titulo)}
                  helperText={touched.titulo && errors.titulo}
                />
              </Grid>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color:
                        touched.tipoOperacao && errors.tipoOperacao
                          ? theme.palette.error.main
                          : "",
                    }}
                  >
                    Tipo Operação
                  </InputLabel>
                  <Select
                    fullWidth
                    label="Tipo Operação"
                    name="tipoOperacao"
                    value={values.tipoOperacao}
                    onChange={(e) =>
                      setFieldValue("tipoOperacao", e.target.value)
                    }
                    error={touched.tipoOperacao && Boolean(errors.tipoOperacao)}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={TipoOperacao.Gasto}>A Pagar</MenuItem>
                    <MenuItem value={TipoOperacao.Recebimento}>
                      A Receber
                    </MenuItem>
                  </Select>
                  {touched.tipoOperacao && errors.tipoOperacao ? (
                    <FormHelperText sx={{ color: theme.palette.error.main }}>
                      {errors.tipoOperacao}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="number"
                  label="Valor"
                  onChange={(e) => setFieldValue("valor", e.target.value)}
                  name="valor"
                  onBlur={handleBlur}
                  value={values.valor}
                  error={touched.valor && Boolean(errors.valor)}
                  helperText={touched.valor && errors.valor}
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
                        name="dataOperacao"
                        onBlur={handleBlur}
                        value={values.dataOperacao}
                        error={
                          touched.dataOperacao && Boolean(errors.dataOperacao)
                        }
                        helperText={touched.dataOperacao && errors.dataOperacao}
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
                  name="descricao"
                  onBlur={handleBlur}
                  value={values.descricao}
                  error={touched.descricao && Boolean(errors.descricao)}
                  helperText={touched.descricao && errors.descricao}
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
