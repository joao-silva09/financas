import {
  Card,
  Grid,
  CardHeader,
  Avatar,
  IconButton,
  TextField,
  CardContent,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import {
  clearDashboard,
  GetGastos,
  GetRecebimentos,
  setStateDashboardDateFilter,
} from "../../store/slices/Dashboard.store";
import {
  GetOperacoesByMonth,
  setStateDateFilter,
} from "../../store/slices/Operacao.store";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/pt-BR";
import { SearchOutlined } from "@mui/icons-material";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetRecebimentos());
    dispatch(GetGastos());
  }, [dispatch]);

  const dashboard = useSelector((root: RootState) => root.dashboardStore);

  const onChangeDate = (value: Date) =>
    dispatch(setStateDashboardDateFilter(value));

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Card>teste</Card>
      </Grid>
      <Grid item xs={4}>
        <Card>teste</Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardHeader title="Movimentações" subheader="Selecione o mês" />
          <CardContent>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={locale}
            >
              <DatePicker
                views={["month", "year"]}
                value={
                  dashboard.filters.dateFilter == undefined
                    ? null
                    : dashboard.filters.dateFilter
                }
                label="Filtrar Por Mês"
                onChange={(value) =>
                  dispatch(setStateDashboardDateFilter(value!))
                }
                renderInput={(props) => (
                  <TextField {...props} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>
            <Button
              variant="outlined"
              fullWidth
              endIcon={<SearchOutlined />}
              onClick={() => {
                dispatch(
                  GetOperacoesByMonth(
                    dashboard.filters.dateFilter?.getMonth()! + 1,
                    dashboard.filters.dateFilter?.getFullYear()
                  )
                );
              }}
            >
              Buscar
            </Button>
          </CardContent>
          <CardContent>
            <TextField
              fullWidth
              size="small"
              label="Entradas"
              disabled
              value={dashboard.recebimentos!.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            />
          </CardContent>
          <CardContent>
            <TextField
              fullWidth
              size="small"
              label="Saídas"
              disabled
              value={dashboard.gastos!.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            />
          </CardContent>
          <CardContent>
            <TextField
              fullWidth
              size="small"
              label="Balanço"
              disabled
              value={(
                dashboard.recebimentos! - dashboard.gastos!
              ).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
