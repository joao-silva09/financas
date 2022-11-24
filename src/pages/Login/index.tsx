import { LoginOutlined } from "@mui/icons-material";
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
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
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
        dispatch(Login(values));
        navigate("/");
      } catch (error: any) {}
    },
  });

  const { handleChange, handleSubmit, values, errors, setFieldValue } = formik;
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
                    label="Email"
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    value={values.email}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    type="password"
                    fullWidth
                    label="Senha"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
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
