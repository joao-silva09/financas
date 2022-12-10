import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardConta from "../../components/Contas/CardConta";
import DialogCriarConta from "../../components/Contas/DialogCriarConta";
import { RootState } from "../../store";
import { GetContas, GetSaldoTotal } from "../../store/slices/Conta.store";

export default function Contas() {
  const dispatch = useDispatch();
  const contas = useSelector((root: RootState) => root.contaStore.contas);
  const saldoTotal = useSelector(
    (root: RootState) => root.contaStore.saldoTotal
  );

  useEffect(() => {
    dispatch(GetContas());
    dispatch(GetSaldoTotal());
  }, [dispatch]);

  const [isOpenDialogCriarConta, setIsOpenDialogCriarConta] = useState(false);
  const handleOpenDialogCriarConta = () =>
    setIsOpenDialogCriarConta(!isOpenDialogCriarConta);

  return (
    <>
      <Button
        variant="contained"
        endIcon={<Add />}
        color="primary"
        onClick={handleOpenDialogCriarConta}
        sx={{ mb: 2 }}
      >
        Criar Conta
      </Button>
      {contas.data && saldoTotal !== 0 && saldoTotal !== undefined && (
        <Typography variant="h6" color="-moz-initial">
          Saldo Total:{" "}
          {saldoTotal.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Typography>
      )}
      <Grid container spacing={3}>
        {contas.data &&
          contas.data.map((data, key) => (
            <Grid item xs={4} key={key}>
              <CardConta
                key={key}
                banco={data.banco}
                saldo={data.saldo}
                titulo={data.titulo}
                id={data.id}
              />
            </Grid>
          ))}
        <DialogCriarConta
          onClose={handleOpenDialogCriarConta}
          open={isOpenDialogCriarConta}
        />
      </Grid>
    </>
  );
}
