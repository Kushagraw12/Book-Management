import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { issue_api } from "../API";
const axios = require('axios');

function SearchCard(props) {
    const books = props.book;
    const uu = props.user;

    const handleIssue = (book) => {
        axios({
          method: 'PUT',
          url: `${issue_api}`,
          headers: {},
          data: {
            userID : uu._id,
            id : book._id,
          }
        })
        .then((res) => {
            console.log(res.status);
            if(res.status === 200){
              alert("Success!");
            }
            if(res.status === 400){
              alert("Not enough copies of the Book available");
            }
        })
        .catch((error) => {
          console.log(error);
          if(error.message === "Request failed with status code 400"){
            alert("Not enough Copies available");
          }
        });
    };

    return (
        <div>
            <b>
                <Typography 
                    style={{padding: '2rem', color: '#1976d2'}} 
                    align="center" 
                    variant="h5">
                        Search Results:
                </Typography>
            </b>
            {typeof(books) === 'undefined' ? <b>LOADING ... </b> : 
                <Grid container spacing={4} style={{justifyContent: 'center', padding: '2rem'}}>
                    {books.constructor === Array ? 
                        books.map((book) => {
                            return (
                                <>
                                <Box sx={{ minWidth: 250 }} style={{padding: '2rem'}}>
                                    <Card variant="outlined" style={{borderColor: '#1976d2', padding: '2rem', margin: 'auto'}}>
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
                                            <Button variant="outlined" size="small" onClick = {() => handleIssue(book)}>Issue Book</Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                                </>
                            );
                        })
                    :
                        <Box sx={{ minWidth: 250 }} style={{padding: '2rem'}}>
                            <Card variant="outlined" style={{borderColor: '#1976d2', padding: '2rem', margin: 'auto'}}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {books.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {books.author}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Year of Publication : {books.year}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" size="small" onClick = {() => handleIssue(books)}>Issue Book</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    }
            </Grid>
            }
        </div>
    );
};

export default SearchCard;