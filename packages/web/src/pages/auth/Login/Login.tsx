import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Alert } from '../components/Alert';
import { Form } from '../components/Form';
import { NavLink } from '../../shared-components';

const validationSchema = yup.object({
  usernameOrEmail: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(false);

      try {
        console.log(values);
        const url = 'http://localhost:3500/authentication/log-in';
        const { data } = await axios.post(url, values, { withCredentials: true });
        console.log(`Is Login ${data}`);
        console.log(data);
      } catch (e) {
        console.log(e.response.data.message, 'error');
        // @ts-ignore
        formikHelpers.setErrors({ errorMsg: e.response.data.message });
      }
      // onSubmit(values).catch((e) => {
      //   formikHelpers.setSubmitting(false);
      //   if (isFormError(e)) {
      //     formikHelpers.setErrors(e.errors);
      //   } else {
      //     throw e;
      //   }
      // });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SignIn
        </Typography>
        <Form name="log-in" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <Box sx={{ marginBottom: 2 }}>
            {/* @ts-ignore */}
            <Alert color="error">{formik.errors.errorMsg}</Alert>
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={formik.isSubmitting}>
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="/forgot-password" variant="body2">
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/signup" variant="body2">
                Don&apos;t have an account? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  );
}
