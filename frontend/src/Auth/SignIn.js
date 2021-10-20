import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login_api } from "../API";
import axios from "axios";

const theme = createTheme();

export default function SignIn() {
    const [user, setUser] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        axios({
          method: 'POST',
          url: login_api,
          headers: {},
          data: {
            email: data.get('email'),
            password: data.get('password'), 
          },
        })
        .then((res) => {
          console.log("Cur User: ", res);
          setUser(res.data);

          // store the user in localStorage
          localStorage.setItem("user", JSON.stringify(res.data));
          window.location.reload();
        })
        .catch((err) => {
          if(err.message === "Request failed with status code 400") {
            alert('Invalid Email/Password!');
          }
          else {
            console.log(err.message);
          }
        });
    };

    console.log(`${typeof(user) === 'undefined' ? "Not signed in" : user}`);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Typography component="h1" variant="h3" style={{textAlign: 'center', padding: '3rem'}}>WELCOME TO THE BOOKSTORE</Typography>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
