// import React, { useState } from 'react';
// import { register_api } from "../API";
// import { Link } from 'react-router-dom';
// import Grid from '@mui/material/Grid';


// export default function SignUp() {
    // const [user, setUser] = useState();
    // const [firstName, setFN] = useState("");
    // const [lastName, setLN] = useState("");
    // const [email, setEm] = useState("");
    // const [pass, setPass] = useState("");
    // const [mobileNum, setMN] = useState("");

    // let kk = <div></div>;

    // const handleSubmit = () => {
    //     axios({
    //         method: 'POST',
    //         url: `${register_api}`,
    //         headers: {},
    //         data: {
    //             firstName: firstName,
    //             lastName: lastName,
    //             password: pass,
    //             emailid: email,
    //             mobileNum: mobileNum,
    //         }
    //     })
    //     .then((res) => {
    //         setUser(res.data);
    //         kk = <Grid container>
    //         <Grid item>
    //           <Link href="/" variant="body2">
    //             {`Welcome ${firstName}, Click me to head over to dashboard`}
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         alert('Error occured!');
    //     });
    // };

    // if(typeof(user) !== 'undefined') {
    //     console.log("OK: ", user);
    //     alert(`Welcome ${user.firstName}!`);
    //     window.location = '/';
    // }

//     return (
//         <>
//             <form>
//                 <input type='text' placeholder='FirstName' value = {firstName} onChange = {(e) => setFN(e.target.value)} />
//                 <br />
//                 <input type='text' placeholder='LastName' value = {lastName} onChange = {(e) => setLN(e.target.value)} />
//                 <br />
//                 <input type='email' placeholder='Email' value = {email} onChange = {(e) => setEm(e.target.value)} />
//                 <br />
//                 <input type='password' placeholder='Password' value = {pass} onChange = {(e) => setPass(e.target.value)} />
//                 <br />
//                 <input type='text' placeholder='Mobile Number' value = {mobileNum} onChange = {(e) => setMN(e.target.value)} />
//                 <br />
//                 <button type='button' onClick={handleSubmit}>
//                     Submit
//                 </button>
//                 <br />
//                 {kk} 
//             </form>
//         </>
//     )
// }

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
import { register_api } from "../API";

const axios = require('axios');

const theme = createTheme();

export default function SignUp() {

  const [user, setUser] = useState();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios({
        method: 'POST',
        url: `${register_api}`,
        headers: {},
        data: {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            password: data.get('password'),
            emailid: data.get('email'),
            mobileNum: data.get('Mobile'),
        }
    })
    .then((res) => {
        setUser(res.data);
    })
    .catch((err) => {
        console.log(err);
        alert('Error occured!');
    });

  };

  
  if(typeof(user) !== 'undefined') {
    console.log("OK: ", user);
    alert(`Welcome ${user.firstName}!`);
    window.location = '/';
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Mobile"
                  label="Contact No"
                  name="Mobile"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}