import React, {useState, useEffect} from 'react';
import { getWBC } from '../services';
import Editor from '../Components/Editor/Editor';
import Spinner from '../Components/Spinner/Spinner';
import WeatherView from '../Components/WeatherView/WeatherView';
import './Widget.scss';

const Widget = () => {
     useEffect(() => {
         init()
     },[])

     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(false);
     const [input, setInput] = useState({
          title:'',
          unit:'metric',
          windStatus:'on',
     })
     const [location, setLocation] = useState({
          long:'',
          lat:'',
          timestamp:''
     })
     const [state, setState] = useState({
          weather:'',
          location:'',
          wind:'',
          main:''
     })

     //On change Unit-- set Load -- fetch data and display
     const changeUnit = async (val)=>{
          try {
               setLoading(true)
               setInput({ ...input, unit: val });
               let res = await getWeather(location.long, location.lat, val);
               setState({...state, weather:res.weather, wind:res.wind, location:res.name, main: res.main});
               setLoading(false)
          } catch (error) {
               setLoading(false)
               setError(true)
               return;
          }
          
     } 
     const changeWind =(val)=> setInput({...input, windStatus:val});
     const enterTitle =(val)=> setInput({...input, title:val});


     // Method to run before mounting Component
     const init = async() =>{
          if (navigator.geolocation) {
               // prompt use to accept location and fetch data
               navigator.geolocation.getCurrentPosition(async(position)=>{
                    try {
                         setLocation({...location, 
                         long:position.coords.longitude, 
                         lat:position.coords.latitude, 
                         timestamp:position.timestamp})
                         let res = await getWeather(position.coords.longitude, position.coords.latitude, 'metric' );
                         setState({...state, weather:res.weather, wind:res.wind, location:res.name, main: res.main})
                         setLoading(false)
                    } catch (error) {
                         setLoading(false)
                         setError(true)
                    }
               });
          }
     }

     // Get weather from services methods
     const getWeather = async(long, lat, unit)=>{
          try {
               const res = await getWBC(long, lat, unit);
               return res;
          } catch (error) {
               setLoading(false)
               setError(true)
               return;
          }
     }
        
     return (
          <div className='Widget'>
               <div className='userInput'>
                    
                    <Editor unit={changeUnit} wind={changeWind} title={enterTitle} />
               </div>
               <div className='visual'>
                    {loading ?
                         <Spinner />
                         :
                         <>
                              { error ? 
                                   <p>Error please Reload the widget</p>
                                   :
                                   <WeatherView time={location.timestamp} data={state} input={input} />
                              }
                         </>
                         
                    }
               </div>
          </div>
     )
}

export default Widget