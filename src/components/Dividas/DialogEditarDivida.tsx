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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddContaDto,
  AddDividaDto,
  AddObjetivoDto,
  SituacaoDivida,
  TipoDivida,
  UpdateDividaDto,
} from "../../services/api";
import { PostConta } from "../../store/slices/Conta.store";
import * as Yup from "yup";
import { PostObjetivo } from "../../store/slices/Objetivo.store";
import { PostDivida, PutDivida } from "../../store/slices/Divida.store";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/pt-BR";

type DialogCriarDividaProps = {
  open: boolean;
  onClose: VoidFunction;
  data?: UpdateDividaDto;
  idDivida?: any;
};

export default function DialogCriarDivida({
  open,
  onClose,
  data,
  idDivida,
}: DialogCriarDividaProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    titulo: Yup.string().required("Este campo é obrigatório!"),
    nomeDevedor: Yup.string().required("Este campo é obrigatório!"),
    descricao: Yup.string().required("Este campo é obrigatório!"),
    valor: Yup.number().required("Este campo é obrigatório!"),
    dataVencimento: Yup.date()
      .nullable()
      .required("Este campo é obrigatório!")
      .typeError("Data inválida")
      .transform((curr, orig) => (orig === "" ? null : curr)),
    tipoDivida: Yup.string().required("Este campo é obrigatório!"),
  });

  const formik = useFormik({
    initialValues: {
      // titulo: data!.titulo,
      // nomeDevedor: data!.nomeDevedor,
      // descricao: data!.descricao,
      // valor: data!.valor,
      // dataVencimento:
      //   data!.dataVencimento === undefined ? null : data!.dataVencimento,
    } as UpdateDividaDto,
    // validationSchema: formSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        let dto = values as UpdateDividaDto;
        dto.id = idDivida;
        dispatch(PutDivida(dto));
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

  const onChangeDate = (field: any, value: any) => {
    setFieldValue(field, value);
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <DialogTitle>Nova Dívida</DialogTitle>
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
                  <InputLabel>Tipo Dívida</InputLabel>
                  <Select
                    fullWidth
                    label="Tipo Dívida"
                    value={values.tipoDivida}
                    onChange={(e) =>
                      setFieldValue("tipoDivida", e.target.value)
                    }
                    error={Boolean(errors.tipoDivida)}
                  >
                    <MenuItem value={TipoDivida.Gasto}>A Pagar</MenuItem>
                    <MenuItem value={TipoDivida.Recebimento}>
                      A Receber
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="Nome Devedor/Credor"
                  onChange={(e) => setFieldValue("nomeDevedor", e.target.value)}
                  value={values.nomeDevedor}
                  error={Boolean(errors.nomeDevedor)}
                  helperText={errors.nomeDevedor}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="number"
                  label="Valor da dívida"
                  onChange={(e) => setFieldValue("valor", e.target.value)}
                  value={values.valor}
                  error={Boolean(errors.valor)}
                  helperText={errors.valor}
                />
              </Grid>
              <Grid item xs={5}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={locale}
                >
                  <DatePicker
                    value={values.dataVencimento}
                    label="Data Vencimento"
                    inputFormat="dd/MM/yyyy"
                    onChange={(value: any) =>
                      onChangeDate("dataVencimento", value!.toString())
                    }
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        fullWidth
                        error={Boolean(errors.dataVencimento)}
                        helperText={errors.dataVencimento}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={10}>
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
                endIcon={<Check />}
                variant="contained"
                color="primary"
              >
                Editar Dívida
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
