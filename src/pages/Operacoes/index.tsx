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
import CardOperacao from "../../components/Operacoes/CardOperacao";
import DialogNovaOperacao from "../../components/Operacoes/DialogNovaOperacao";
import { RootState } from "../../store";
import { GetContas } from "../../store/slices/Conta.store";
import { GetOperacoes } from "../../store/slices/Operacao.store";

export default function Contas() {
  const dispatch = useDispatch();
  const operacoes = useSelector(
    (root: RootState) => root.operacoesStore.operacoes
  );

  useEffect(() => {
    dispatch(GetOperacoes());
    dispatch(GetContas());
  }, [dispatch]);

  const [isOpenDialogNovaOperacao, setIsOpenDialogNovaOperacao] =
    useState(false);
  const handleOpenDialogNovaOperacao = () =>
    setIsOpenDialogNovaOperacao(!isOpenDialogNovaOperacao);

  return (
    <>
      <Button
        variant="contained"
        endIcon={<Add />}
        color="primary"
        onClick={handleOpenDialogNovaOperacao}
        sx={{ mb: 2 }}
      >
        Nova Operação
      </Button>
      <Grid container spacing={3}>
        {operacoes.data &&
          operacoes.data.map((data, key) => (
            <Grid item xs={3}>
              <CardOperacao
                key={key}
                conta={data.conta}
                dataOperacao={data.dataOperacao}
                titulo={data.titulo}
                descricao={data.descricao}
                tipoDivida={data.tipoDivida}
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
