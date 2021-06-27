import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { connect } from "react-redux";
import { addAuth } from "src/actions";
import * as Yup from "yup";
import { addData } from "src/actions";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";

const Login = ({ dispatch }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const getSessionData = async (authToken) => {
    let apiDatas = [
      "company",
      "roles",
      "privilege",
      "energysource",
      "publicinstitution",
      "publicsector",
    ];
    let dashboardStats;
    let sessionData = await Promise.all(
      apiDatas.map(async (el) => {
        let data;
        try {
          data = await axios.get(`http://3.65.109.190/api/v1/${el}`, {
            headers: {
              Authorization: authToken,
            },
          });
        } catch (err) {
          console.error(err);
        }
        return data.data;
      })
    );

    apiDatas.forEach((el, ind) => {
      sessionStorage.setItem(el, JSON.stringify(sessionData[ind].data));
      dispatch(addData({ dataName: el, payload: sessionData[ind].data }));
    });
    try {
      dashboardStats = await axios.get(
        `http://3.65.109.190/api/v1/dashboard/stats`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }

    sessionStorage.setItem(
      "dashboardStats",
      JSON.stringify(dashboardStats.data.data)
    );
    dispatch(
      addData({ dataName: "dashboardStats", payload: dashboardStats.data.data })
    );
  };
  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{ username: "testUser1", password: "12345678" }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required("Username is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              let newAuth;
              try {
                newAuth = await axios.post(
                  "http://3.65.109.190/api/v1/users/login",
                  values
                );
              } catch (error) {
                console.error(error);
                setSubmitting(false);
                return;
              }
              console.log(newAuth);
              dispatch(addAuth(newAuth.data.data));
              sessionStorage.setItem("user", JSON.stringify(newAuth.data.data));
              sessionStorage.setItem("AuthToken", newAuth.data.data.token);
              await getSessionData(newAuth.data.data.token);
              navigate("/app/dashboard", { replace: true });
              setSubmitting(false);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="username"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default connect()(Login);
