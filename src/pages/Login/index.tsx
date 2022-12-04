import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  CardHeader,
  Avatar,
  Link,
  IconButton,
  Divider,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeIconMode from "../../components/ThemeIconMode";
import { UsuarioLoginDto, UsuarioRegisterDto } from "../../services/api";
import { RootState } from "../../store";
import { Login } from "../../store/slices/Auth.store";
import SignIn from "../Register";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((root: RootState) => root.authStore);
  const conts = useSelector((root: RootState) => root.contaStore);
  const formik = useFormik({
    initialValues: {} as UsuarioLoginDto,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        dispatch(Login(values));
      } catch (error: any) {
      } finally {
        setSubmitting(false);
        navigate("/");
      }
    },
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    setFieldValue,
  } = formik;

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
        <Card sx={{ pb: 4 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pr={2}
          >
            <CardHeader title="Login" />
            <Typography variant="body2" color="-moz-initial">
              Não tem uma conta?{" "}
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
                underline="hover"
              >
                Cadastre-se
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
                    endIcon={<LoginOutlined />}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Login
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
