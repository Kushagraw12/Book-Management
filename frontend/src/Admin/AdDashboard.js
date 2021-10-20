import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { get_books_api, add_api, change_copies_api, delete_api } from '../API';
const axios = require('axios');

export default function AdminDash(props) {
    const user = props.user;
    if(user !== null) {
        if(!user.isAdmin) {
            window.location = "/";
        }
    }
    const [books, setbooks] = useState();

    const [title, setTitle] = useState("");
    const [author, setAuth] = useState("");
    const [year, setYr] = useState("");
    const [copies, setCp] = useState("");
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

    const handleSubmit = () => {
        // console.log("ss");
        axios({
            method: "POST",
            url: add_api,
            header: {},
            data: {
                title: title,
                author: author,
                year: year,
                copies: copies
            }
        })
        .then((res) => {
            alert(res.data);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
    };

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

    return(
        <>
            <form>
                <input type='text' placeholder='Title' value = {title} onChange = {(e) => setTitle(e.target.value)} />
                <br />
                <input type='text' placeholder='Author' value = {author} onChange = {(e) => setAuth(e.target.value)} />
                <br />
                <input type='text' placeholder='Year of Publication' value = {year} onChange = {(e) => setYr(e.target.value)} />
                <br />
                <input type='number' placeholder='Copies' value = {copies} onChange = {(e) => setCp(e.target.value)} />
                <br />
                <button type='button' onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            <br />
            <hr />
            <br />
            {typeof(books) === 'undefined' ? <b>LOADING ... </b> : 
            books.map((book) => {
                return (
                    <>
                    <Box sx={{ minWidth: 250 }}>
                        <Card variant="outlined" style={{borderColor: '#1976d2'}}>
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
                                    <input placeholder="Change copies to" value={newCopies} onChange={(e) => {setNewCopies(e.target.value)}} />
                                    <Button type='submit' onClick={() => changeCopies(book)} variant="outlined" size="small">Change Copies</Button>
                                    <Button type='submit' onClick={() => handleDelete(book)} variant="outlined" size="small">Delete Book</Button>
                            </CardActions>
                        </Card>
                    </Box>
                    </>
                );
            })}
        </>
    );
};