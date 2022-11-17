import { Add } from "@mui/icons-material";
import { Box, Button, Card, Grid, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardConta from "../../components/Contas/CardConta";
import DialogCriarConta from "../../components/Contas/DialogCriarConta";
import { RootState } from "../../store";
import { GetContas } from "../../store/slices/Conta.store";

export default function Contas() {
  const dispatch = useDispatch();
  const contas = useSelector((root: RootState) => root.contaStore.contas);

  useEffect(() => {
    dispatch(GetContas());
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
