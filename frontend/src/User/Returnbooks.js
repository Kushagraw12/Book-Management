import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { get_issued_api, return_api, get_user_api } from "../API";
import Login from '../Auth/Login';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import PrimarySearchAppBar from '../Components/Navbar';


function CardComp(props) {
    const book = props.book;
    const [user, setUser] = useState(props.user);

    const handleReturn = () => {
        axios({
          method: 'PUT',
          url: `${return_api}`,
          headers: {},
          data: {
            userID : user._id,
            id : book._id,
          }
        })
        .then((res) => {
            console.log(res.status);
            if(res.status === 200){
                alert("Success!");
                axios({
                    method: 'POST',
                    url: get_user_api,
                    headers: {},
                    data: {
                        userID: user._id,
                    }
                })
                .then((res) => {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                    // window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
                window.location.reload();
            }
        })
        .catch((error) => {
          console.log(error);
          if(error.message === "Request failed with status code 400"){
            alert("Book not found");
          }
        });
    };
    return (
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {book.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {book.author}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Year of Publication : {book.year}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small" onClick = {handleReturn}>Return Book</Button>
          </CardActions>
        </React.Fragment>
    );
  };
  

export default function ReturnBooks(props) {
    const [user, setUser] = useState(props.user);
    
    if(user === null) {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }    
    if(user === null) {
        <Login />
    }
    useEffect(() => {
        axios({
            method: 'POST',
            url: get_user_api,
            headers: {},
            data: {
                userID: user._id,
            }
        })
        .then((res) => {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((error) => {
            console.log(error);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    const [books, setBooks] = useState(null);

    useEffect(() => {
        axios.post(get_issued_api, user)
        .then((res) => {
            console.log(res.data);
            setBooks(res.data);
        })
    },[user]);

    return(
        <div>
            <PrimarySearchAppBar />
            <Typography component="h1" variant="h3" style={{textAlign: 'center', padding: '2rem'}}>YOUR BOOKS</Typography>
            <br />
            {books === null ? <div> LOADING ... </div> : <Grid container spacing={2} style={{padding: '2rem'}}>
              { books.map((book) => {
                  return (
                    <Box sx={{ minWidth: 250 }} style={{padding: '2rem'}}>
                    <Card variant="outlined" style={{borderColor: '#1976d2', padding: '2rem'}}>
                        <CardComp book={book} user = {user} />
                    </Card>
                    </Box>
                  )
              })}
            </Grid>
            }

        </div>
    );
};