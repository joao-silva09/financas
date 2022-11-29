import { Add, SearchOffOutlined, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardConta from "../../components/Contas/CardConta";
import DialogCriarConta from "../../components/Contas/DialogCriarConta";
import CardOperacao from "../../components/Operacoes/CardOperacao";
import DialogNovaOperacao from "../../components/Operacoes/DialogNovaOperacao";
import { RootState } from "../../store";
import { GetContas } from "../../store/slices/Conta.store";
import {
  GetOperacoes,
  GetOperacoesByMonth,
} from "../../store/slices/Operacao.store";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/pt-BR";

export default function Contas() {
  const dispatch = useDispatch();
  const operacoes = useSelector(
    (root: RootState) => root.operacoesStore.operacoes
  );

  const [dateFilter, setDateFilter] = useState<Date>(new Date());

  const onChangeDate = (value: Date) => {
    setDateFilter(value);
    console.log(dateFilter);
  };

  useEffect(() => {
    dispatch(
      GetOperacoesByMonth(
        dateFilter?.getMonth()! + 1,
        dateFilter?.getFullYear()
      )
    );
    dispatch(GetContas());
  }, [dispatch]);

  const [isOpenDialogNovaOperacao, setIsOpenDialogNovaOperacao] =
    useState(false);
  const handleOpenDialogNovaOperacao = () =>
    setIsOpenDialogNovaOperacao(!isOpenDialogNovaOperacao);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          endIcon={<Add />}
          color="primary"
          onClick={handleOpenDialogNovaOperacao}
          sx={{ mb: 2, mr: 3 }}
        >
          Nova Operação
        </Button>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locale}
          >
            <DatePicker
              views={["month", "year"]}
              value={dateFilter == undefined ? null : dateFilter}
              label="Filtrar Por Mês"
              onChange={(value) => onChangeDate(value!)}
              renderInput={(props) => (
                <TextField {...props} fullWidth size="small" />
              )}
            />
          </LocalizationProvider>
          <Button
            variant="outlined"
            fullWidth
            endIcon={<SearchOutlined />}
            onClick={() =>
              dispatch(
                GetOperacoesByMonth(
                  dateFilter?.getMonth()! + 1,
                  dateFilter?.getFullYear()
                )
              )
            }
            sx={{ mx: 3 }}
          >
            Buscar
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {operacoes.data &&
          operacoes.data.map((data, key) => (
            <Grid item xs={3} sx={{ mt: 3 }}>
              <CardOperacao
                key={key}
                conta={data.conta}
                dataOperacao={data.dataOperacao}
                titulo={data.titulo}
                descricao={data.descricao}
                tipoOperacao={data.tipoOperacao}
                id={data.id}
                valor={data.valor}
              />
            </Grid>
          ))}
        <DialogNovaOperacao
          onClose={handleOpenDialogNovaOperacao}
          open={isOpenDialogNovaOperacao}
        />
      </Grid>
    </>
  );
}
