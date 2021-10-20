import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {add_api} from '../API';
const axios = require('axios');

const theme = createTheme();

export default function AddBook() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('copies'), data.get('year'));
    axios({
        method: "POST",
        url: add_api,
        header: {},
        data: {
            title: data.get('title'),
            author: data.get('author'),
            year: data.get('year'),
            copies: data.get('copies')
        }
    })
    .then((res) => {
        alert(res.data);
        // window.location.reload();
    })
    .catch((err) => {
        console.log(err);
        if(err.message === 'Request failed with status code 400') {
          alert(`ERROR: One or more fields are missing`);
        }
    });
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AddCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Add Book
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="author"
                  label="Author"
                  name="author"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="year"
                  label="Year of publication"
                  name="year"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="copies"
                label="Number of copies"
                type="number"
                name="copies"
                InputLabelProps={{
                    shrink: true,
                }}
            />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add book
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => window.location="/"}
            >
              Go back to Home Page
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
