import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeIconMode from "../../components/ThemeIconMode";
import { UsuarioRegisterDto } from "../../services/api";
import { RootState } from "../../store";
import { Login, Logout, Register } from "../../store/slices/Auth.store";
import { GetContaById, GetContas } from "../../store/slices/Conta.store";
// import { getContas, user_login } from "../../services/authServices";
// import { UsuarioRegisterDto } from "../../services/interfaces";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      nome: "nome",
    } as UsuarioRegisterDto,
    onSubmit: (values) => {
      dispatch(Register(values));
    },
  });

  const { handleChange, handleSubmit, values, errors, setFieldValue } = formik;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <Grid container minHeight="100vh">
      <Grid container height="5vh">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            p: 2,
          }}
        >
          <ThemeIconMode />
        </Box>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="95vh"
        pb={15}
      >
        <Card sx={{ pb: 4, maxWidth: "45vw" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pr={2}
          >
            <CardHeader title="Cadastro" />
            <Typography variant="body2" color="-moz-initial">
              Já tem uma conta?{" "}
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
                underline="hover"
              >
                Fazer login
              </Link>
            </Typography>
          </Box>
          <Divider />
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Grid container rowSpacing={4} justifyContent="center" pt={2}>
                <Grid item xs={8}>
                  <TextField
                    type="text"
                    variant="outlined"
                    autoFocus
                    fullWidth
                    label="Nome de usuário"
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    value={values.email}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    label="Senha"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {!showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Card>
      </Grid>
    </Grid>
  );
}
