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
  GetDadosByMonth,
  GetGastosByMonth,
  GetRecebimentosByMonth,
  setStateDashboardDateFilter,
} from "../../store/slices/Dashboard.store";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/pt-BR";
import { SearchOutlined } from "@mui/icons-material";
import DonutOperacoesMes from "./Charts/DonutOperacoesMes";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetRecebimentosByMonth(
        store.getState().dashboardStore.filters.dateFilter.getMonth() + 1,
        store.getState().dashboardStore.filters.dateFilter.getFullYear()
      )
    );
    dispatch(
      GetGastosByMonth(
        store.getState().dashboardStore.filters.dateFilter.getMonth() + 1,
        store.getState().dashboardStore.filters.dateFilter.getFullYear()
      )
    );
    dispatch(
      GetDadosByMonth(
        store.getState().dashboardStore.filters.dateFilter.getMonth() + 1,
        store.getState().dashboardStore.filters.dateFilter.getFullYear()
      )
    );
  }, [dispatch]);

  const dashboard = useSelector((root: RootState) => root.dashboardStore);

  const onChangeDate = (value: Date) =>
    dispatch(setStateDashboardDateFilter(value));

  const onFilter = () => {
    dispatch(
      GetRecebimentosByMonth(
        store.getState().dashboardStore.filters.dateFilter.getMonth() + 1,
        store.getState().dashboardStore.filters.dateFilter.getFullYear()
      )
    );
    dispatch(
      GetGastosByMonth(
        store.getState().dashboardStore.filters.dateFilter.getMonth() + 1,
        store.getState().dashboardStore.filters.dateFilter.getFullYear()
      )
    );
    dispatch(
      GetDadosByMonth(
        store.getState().dashboardStore.filters.dateFilter.getMonth() + 1,
        store.getState().dashboardStore.filters.dateFilter.getFullYear()
      )
    );
    console.log(dashboard);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Card>
          <DonutOperacoesMes />
        </Card>
      </Grid>
      <Grid item xs={5}>
        <Card>teste</Card>
      </Grid>
      <Grid item xs={3}>
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
              sx={{ mt: 1 }}
              variant="outlined"
              fullWidth
              endIcon={<SearchOutlined />}
              onClick={onFilter}
            >
              Buscar
            </Button>
          </CardContent>
          {dashboard && (
            <>
              <CardContent>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  label="Entradas"
                  disabled
                  value={dashboard.totalRecebimentos!.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                />
              </CardContent>
              <CardContent>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  label="Saídas"
                  disabled
                  value={dashboard.totalGastos!.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                />
              </CardContent>
              <CardContent>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  label="Balanço"
                  disabled
                  value={(
                    dashboard.totalRecebimentos! - dashboard.totalGastos!
                  ).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                />
              </CardContent>
            </>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
