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
  FormControl,
  FormLabel,
  FormHelperText,
  FormControlLabel,
  Checkbox,
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
  GetOperacoesByMonthAndType,
  setDateFilter,
  setStateDateFilter,
  setStateTypeFilterGastos,
  setStateTypeFilterRecebimentos,
} from "../../store/slices/Operacao.store";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/pt-BR";
import { TipoOperacao } from "../../services/api";

export default function Contas() {
  const dispatch = useDispatch();
  const operacoes = useSelector(
    (root: RootState) => root.operacoesStore.operacoes
  );

  const filters = useSelector((root: RootState) => root.operacoesStore.filters);

  const onChangeDate = (value: Date) => dispatch(setStateDateFilter(value));

  useEffect(() => {
    dispatch(
      GetOperacoesByMonthAndType(
        filters.dateFilter?.getMonth()! + 1,
        filters.dateFilter?.getFullYear()
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={3}
        >
          <FormControlLabel
            label="Recebimentos"
            control={
              <Checkbox
                value=""
                checked={filters.typeFilter.recebimentos}
                onChange={(e) =>
                  dispatch(setStateTypeFilterRecebimentos(e.target.checked))
                }
                color="primary"
              />
            }
          />
          <FormControlLabel
            label="Gastos"
            control={
              <Checkbox
                value=""
                checked={filters.typeFilter.gastos}
                onChange={(e) =>
                  dispatch(setStateTypeFilterGastos(e.target.checked))
                }
                color="primary"
              />
            }
          />
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locale}
          >
            <DatePicker
              views={["month", "year"]}
              value={
                filters.dateFilter == undefined ? null : filters.dateFilter
              }
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
                GetOperacoesByMonthAndType(
                  filters.dateFilter?.getMonth()! + 1,
                  filters.dateFilter?.getFullYear()
                )
              )
            }
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
          dateFilter={filters.dateFilter}
        />
      </Grid>
    </>
  );
}
