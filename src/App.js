import './App.css';
import {useEffect, useState} from 'react'


function App() {

  const [latitude, setlatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState("");
  const [icon, setIcon] = useState(null);
  const [txtDesc, setTxtDesc] = useState("");
  const [tempC, setTemC] = useState(null);
  const [tempF, setTempF] = useState(0);



  const gotPosition = (position) => {
    setlatitude(position.coords.latitude);
    setLongitude(position.coords.longitude)
  };

  const getLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(gotPosition);
      const reqInfo = await `https://api.weatherapi.com/v1/current.json?key=d602d1948ede425291845325210307&q=${latVal},${lonVal}`;
      const response = await fetch(reqInfo);
      const data = await response.json();
      console.log(data)
      //AQUI SE ASIGNAN LOS VALORES CORRESPONDIENTES
      setCity(data.location.tz_id)
      setCountry(data.location.country)
      setIcon(data.current.condition.icon)
      setTxtDesc(data.current.condition.text)
      setTemC(data.current.temp_c)
      setTempF(data.current.temp_f)
    } catch (error) {
      alert('sin acceso a la ubicacion')
    }
  };

  const latVal = latitude;
  const lonVal = longitude;

  useEffect(() => {
    getLocation();
  });
 
  
  return (
    <div className="App">
      <h1>The Weather App</h1>
    
      <div className="diapay"> los datos son los siguientes </div>
      <div>latitude: {latitude} </div>
      <div>longitude: {longitude} </div>
      <div>city: {city} </div>
      <div>country: {country} </div>
      <div> {icon} </div>
      <div> description: {txtDesc} </div>
      <div>Temperature °C: {tempC} </div>
      <div>Temperature °F: {tempF} </div>
      <button></button>
    </div>
  );
}

export default App;
