import './App.css';
import {useEffect, useState} from 'react'


function App() {

  //AQUI SE SOLICITA Y ORGANIZA LA GEOLOCALIZACION DEL USUARIO

  useEffect(() => {
    getLocation();
  })

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosDat({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      })},
    function (error) {alert('No se pudo obtener su ubicación, Por favor recarge la pagina')})
  };

  const [posDat, setPosDat] = useState({
    longitude: 0,
    latitude: 0
  })

  // ESTA ES LA RESPUESTA DE LA APPI
  
  const infoRequest = async sendingUserInfo => {
    const url = `http://api.weatherapi.com/v1/current.json?key=d602d1948ede425291845325210307&q=${posDat.latitude},${posDat.longitude}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
  }
  infoRequest()
  
  return (
    <div className="App">
      <h1>Hola Mundo</h1>

      <div className="diapay"> los datos son los siguientes </div>
      <div>latitude: {posDat.latitude} </div>
      <div>longitude: {posDat.longitude} </div>
    </div>
  );
}

export default App;
