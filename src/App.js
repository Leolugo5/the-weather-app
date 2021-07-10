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
  const [tempF, setTempF] = useState(null);


  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }, [])
  useEffect(()=> {
    const request = async () => {
      const link = `https://api.weatherapi.com/v1/current.json?key=d602d1948ede425291845325210307&q=${latitude},${longitude}&aqi=no`;
      const response = await fetch(link);
      const data = await response.json();
      setCity(data.location.name)
      setCountry(data.location.country)
      setIcon(data.current.condition.icon)
      setTxtDesc(data.current.condition.text)
      setTemC(data.current.temp_c)
      setTempF(data.current.temp_f)
    }
    if (latitude && longitude) {
      request()
    }
  }, [latitude, longitude])
  
  

  return (
    <div className="App">
      <h1>The Weather App</h1>
      <div className="main-card">
      <div className="title">
      <h2>The weather in your location is as it follows</h2> 
      </div>
    
      <div className="display">
      <div>City: {city} </div>
      <div>Country: {country} </div>
      <br />
      <div> {txtDesc} </div>
      <img src={icon} alt="icon" />
      <div> Temperature is: </div>
      <div> {tempC} °C </div>
      <div> {tempF} °F </div>

      </div>
      </div>
    </div>
  );
}

export default App;
