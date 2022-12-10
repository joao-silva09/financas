import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DialogCriarDivida from "../../components/Dividas/DialogCriarDivida";
import DividasAPagar from "../../components/Dividas/DividasAPagar";
import DividasAReceber from "../../components/Dividas/DividasAReceber";
import { GetContas } from "../../store/slices/Conta.store";
import { GetDividasAtivas } from "../../store/slices/Divida.store";

export default function Ativas() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDividasAtivas());
    dispatch(GetContas());
  }, []);

  const [isOpenDialogCriarDivida, setIsOpenDialogCriarDivida] = useState(false);
  const handleOpenDialogCriarDivida = () =>
    setIsOpenDialogCriarDivida(!isOpenDialogCriarDivida);

  return (
    <>
      <Button
        endIcon={<Add />}
        onClick={handleOpenDialogCriarDivida}
        variant="contained"
        sx={{ mb: 2 }}
        color="primary"
      >
        Nova Dívida
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <DividasAPagar />
        </Grid>
        <Grid item xs={6}>
          <DividasAReceber />
        </Grid>
      </Grid>
      <DialogCriarDivida
        onClose={handleOpenDialogCriarDivida}
        open={isOpenDialogCriarDivida}
      />
    </>
  );
}
