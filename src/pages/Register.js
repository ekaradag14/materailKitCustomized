import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              emailAddress: '',
              username: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              emailAddress: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              username: Yup.string()
                .max(255)
                .required('Username is required'),
              password: Yup.string().max(255).required('password is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
              let newUser;
              try {
                newAuth = await axios.post(
                  "http://3.65.109.190/api/v1/users/register",
                  values
                );
              } catch (error) {
                console.error(error);
                setSubmitting(false);
                return;
              };
              navigate("/login", { replace: true });
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
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
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
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.emailAddress && errors.emailAddress)}
                  fullWidth
                  helperText={touched.emailAddress && errors.emailAddress}
                  label="Email Address"
                  margin="normal"
                  name="emailAddress"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="emailAddress"
                  value={values.emailAddress}
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
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
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

export default Register;
