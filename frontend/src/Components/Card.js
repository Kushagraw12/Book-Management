import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { issue_api } from "../API";
const axios = require('axios');

function CardComp(props) {
  const book = props.book;
  const user = props.user;
  let uu = JSON.parse(user);
  let iss = 0;
  const handleIssue = () => {
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
            iss = 1;
            alert("Success!");
          }
          if(res.status === 400){
            iss = -1;
            alert("Not enough copies of the Book available");
          }
      })
      .catch((error) => {
        console.log(error);
        if(error.message === "Request failed with status code 400"){
          iss = -1;
          alert(`Sorry, not enough copies are currently available of ${book.title}`);
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
          <Typography sx={{ mb: 2 }} color="text.secondary">
            {(iss === 1) ? <b>Issued Succesfully!</b> : <b></b>}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" style={{margin: 'auto'}} onClick = {handleIssue}>Issue Book</Button>
        </CardActions>
      </React.Fragment>
  );
};


export default function OutlinedCard(props) {
  const book = props.book;
  const user = props.user;

  return (
    <Box sx={{ minWidth: 250 }}>
      <Card variant="outlined" style={{borderColor: '#1976d2', textAlign: 'center'}}>
          <CardComp book={book} user = {user} />
      </Card>
    </Box>
  );
};