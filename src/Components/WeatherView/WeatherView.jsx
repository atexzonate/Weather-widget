import React from 'react'
import './WeatherView.scss';
import moment from 'moment';

const WeatherView = ({data:{weather, wind, location, main}, input:{title, windStatus, unit}, time}) => {
     const {description ,icon} = weather[0]

     // Translate degree cardinal direction in Letters only 8 point to consider
     const getCardinalDirection = (angle)=> {
          const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
          return directions[Math.round(angle / 45) % 8];
     }
     return (
          <div className='weatherView'>
               <div className="header">
                    <h2>
                         {title.length===0?
                              'Title of Widget'
                              :
                              title
                         }
                    </h2>
               </div>
               {/* check the type of day( day or night ) */}
               <div className={icon[2] ==='d'? 'weatherBoxDay':'weatherBoxNight'}>
                    <div>
                         <h2 className='description'> {Math.round(main.temp)} °{unit ==='metric'? 'C':'F'} | {description}</h2>
                    </div>

                    <div>
                         <h5>{location}</h5>
                    </div>
                    <div className='weatherIcon'>
                         {/* image from openweathermap */}
                         <img className='img' alt='weather icon' src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
                    </div>
                    <div className='time'>
                         <p>{moment(time).format('ddd h:mm A')}</p>
                    </div>
                    { windStatus==='on' ?
                         <div className='wind'>
                              <div className="windIcon">
                                   {/* Image from icons8 */}
                                   <img alt='wind' src="https://img.icons8.com/color/18/000000/wind.png" />

                              </div>
                              <p>{getCardinalDirection(wind.deg)} {Math.round(wind.speed)} {unit ==='metric'? 'km/h':'m/s'} </p>
                         </div>
                         :
                         ''
                    }
                    
               </div>
          </div>
     )
}

export default WeatherView
