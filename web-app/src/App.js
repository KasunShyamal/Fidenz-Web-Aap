
import './App.css';
import cities from "./cities.json"
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Modal from 'react-modal';
import moment from 'moment';
import { Container } from '@mui/material';

function App() {
 
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  let subtitle;
  var date = new Date(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [res , setRes] = useState({})

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    console.log("sasasas", cities);
  }, [])

  const onClickCard = (cityId) => {
    console.log("asasa" , cityId);
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=44030bdafd61259542ae476328a92263`)
      .then(function (response) {
        setRes(response.data)
        setIsOpen(true)
        console.log("res" , response.data);
        // return response;
      })
      .catch(function (error) {
        return error;
      });
  }


  return (
  
    <div className="App">
      <div> <h1 style={{color: 'White'}}>Weather Details</h1></div>
      

      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: '20%' , marginRight: '2%'}}>
        {cities.map((item) => {
          return (
            <Container>
              
            <Card onClick={() => onClickCard(item.CityCode)}>
          <React.Fragment>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.CityName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Click to view More</Button>
            </CardActions>
          </React.Fragment>
        </Card>
        </Container>
          )
        })}
     </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <h1 style={{color: 'White'}}>This is the latest weather forcast</h1>
      

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
        <div><h1>Weather Details</h1></div>
        <div>City Name : {res?.name}</div>
        <div>Status : {res && res.weather ? res.weather[0].description : ""}</div>
        <div>Temprature : {Math.round((res?.main?.temp - 273.15)*100)/100}&deg;C</div>
        <div>Last Updated By : {moment(date.setUTCSeconds(res?.dt)).format('DD/MM/YYYY')}</div>
        <br></br>
        <Container>
        <button style = {{alignContent: 'center'}} onClick={closeModal}>close</button>
        </Container>
        
      </Modal>
    </div>
  );
 
}

export default App;
