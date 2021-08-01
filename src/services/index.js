import axios from 'axios';

const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const API = process.env.REACT_APP_OPEN_WEATHER_API_KEY


// get weather by Coordinate and unit
export const getWBC = async (long,lat,unit)=>{
     try {
          // Link to call api https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
          const res = await axios.get(`${OPEN_WEATHER_URL}lat=${lat}&lon=${long}&appid=${API}&units=${unit}`);
          return res.data;
     } catch (err) {
          throw new Error();
     }
}