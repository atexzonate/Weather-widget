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
                    >
                         <input className='left' type="radio" value="metric" name="temperature" defaultChecked onClick={((e)=>unit(e.target.value))} /><span>°C</span> 
                         <input  className='right' type="radio" value="imperial" name="temperature" onClick={((e)=>unit(e.target.value))}/><span>°F</span>  
                    </div>
               </div>
               <div className='windInput'>
                    <label>Wind</label>
                    
                    <div 
                         className='wind'
                    >
                         <input className='left' type="radio" value='on' name="wind" defaultChecked onClick={((e)=>wind(e.target.value))} /><span>ON</span>  
                         <input className='right' type="radio" value='off' name="wind" onClick={((e)=>wind(e.target.value))} /><span>OFF</span> 
                    </div>
               </div>
          </div>
     )
}

export default Editor
