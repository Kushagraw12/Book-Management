import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { get_books_api } from "../API";
import PrimarySearchAppBar from '../Components/Navbar';
import OutlinedCard from '../Components/Card';
import { Grid, Typography } from '@mui/material';
import {Carousel} from 'react-bootstrap';


export default function Dashboard(props) {
    // COMMON FOR ALL
    const user = localStorage.getItem('user');
   
    const [books, setBooks] = useState(null);

    useEffect(() => {
        axios.get(get_books_api)
        .then((res) => {
            console.log(res.data);
            setBooks(res.data);
        })
    },[]);
    let kk = (books === null) ? 
    <div>LOADING...</div> 
    : 
    <>
    <b>
        <Typography style={{padding: '2rem', color: '#1976d2'}} align="center" variant="h4">HAVE A LOOK AT MOST ISSUED BOOKS</Typography>
    </b>
        <Carousel variant="dark" style={{ width: '90%' , margin: 'auto', padding: '2.2rem'}}>
            {books.sort(function(a, b) {
                var keyA = (a.borrowed),
                    keyB = (b.borrowed);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
                }).filter((b, idx) => idx < 3).map((b) => {
                    return(
                        <Carousel.Item >
                            <OutlinedCard book={b} user = {user} />
                        </Carousel.Item>

                    )
                })
            }
        </Carousel>
    <Grid container spacing={2} style={{padding: '2rem'}}>
       {books.map((book) => {
        return (
            <Grid item md={4}>
                <OutlinedCard book={book} user = {user} />
            </Grid>
        )
        })}
    </Grid>
    </>

    return(
        <div>
            <PrimarySearchAppBar />
            {kk}
        </div>
    )
};