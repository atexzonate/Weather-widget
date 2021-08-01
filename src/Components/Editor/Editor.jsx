import React from 'react'
import './Editor.scss'

const Editor = ({title, wind, unit}) => {
     return (
          <div>
               <div className='titleInput'>
                    <label>Title of Widget</label>
                    <input
                         placeholder='Title of widget'
                         className='input'
                         onChange={((e)=>title(e.target.value))}
                    />
               </div>
               <div className='tempInput'>
                    <label>Temperature</label>
                    <div 
                         className='temperature'
                         onChange={((e)=>unit(e.target.value))}
                    >
                         <input className='left' type="radio" value="metric" name="temperature" defaultChecked /><span>°C</span> 
                         <input  className='right' type="radio" value="imperial" name="temperature"/><span>°F</span>  
                    </div>
               </div>
               <div className='windInput'>
                    <label>Wind</label>
                    
                    <div 
                         className='wind'
                         onChange={((e)=>wind(e.target.value))}
                    >
                         <input className='left' type="radio" value='on' name="wind" defaultChecked /><span>ON</span>  
                         <input className='right' type="radio" value='off' name="wind" /><span>OFF</span> 
                    </div>
               </div>
          </div>
     )
}

export default Editor
