import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { get_books_api, change_copies_api, delete_api } from '../API';
import PrimarySearchAppBar from '../Components/Navbar';
const axios = require('axios');

function UpdateBook() {
    const [books, setbooks] = useState();
    const [newCopies, setNewCopies] = useState('');

    useEffect(() => {
        axios({
            method: 'GET',
            url: get_books_api,
            headers: {},
        })
        .then((res) => {
            setbooks(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    function changeCopies(book) {
        axios({
            method: "PUT",
            url: change_copies_api,
            header: {},
            data: {
                id: book._id,
                copies: newCopies,
            }
        })
        .then((res) => {
            alert(`Copies of ${book.title} changed to ${newCopies}!`);
            window.location.reload();
        })
        .catch((err) => {
            alert(`Operation Failed!`);
            console.log(err);
        });
    };

    function handleDelete(book) {
        axios({
            method: "DELETE",
            url: delete_api,
            header: {},
            data: {
                id: book._id,
            }
        })
        .then((res) => {
            alert(`${book.title} is no more available in the library!`);
            window.location.reload();
        })
        .catch((err) => {
            alert(`Operation Failed!`);
            console.log(err);
        });
    };
    return (
        <div>
            <PrimarySearchAppBar />
            {typeof(books) === 'undefined' ? <b>LOADING ... </b> : 
            <Grid container spacing={4} style={{justifyContent: 'center', padding: '2rem'}}>
                {books.map((book) => {
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
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Number of Copies available : {book.copies}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Number of times issued : {book.borrowed}
                                </Typography>
                                </CardContent>
                                <CardActions>
                                    <input placeholder="Change copies to" onChange={(e) => {setNewCopies(e.target.value)}} style={{margin: '1rem'}} />
                                    <Button type='submit' onClick={() => changeCopies(book)} variant="outlined" size="small">Change Copies</Button>
                                    <Button type='submit' onClick={() => handleDelete(book)} variant="outlined" size="small">Delete Book</Button>
                            </CardActions>
                        </Card>
                    </Box>
                    </>
                );
            })}
            </Grid>
            }
        </div>
    )
}

export default UpdateBook
