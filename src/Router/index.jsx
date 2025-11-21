import { BrowserRouter, Routes, Route  } from "react-router-dom"
import LayoutMain from '../Layout/layoutMain.jsx'
import Home from '../element/Home.jsx'
import Login from '../element/login.jsx'
import Register from '../element/register.jsx'

const Routers =()=>{
    return(
        <BrowserRouter>
        <Routes>
           <Route element={<LayoutMain/>}>
                 <Route path="/" element={<Login/>}/>
                 <Route path="/dangky" element={<Register/>}/>    
                <Route path="/home" element={<Home/>}/>
                
                

           </Route>

        </Routes>
               
        </BrowserRouter>

        
    )

}

export default Routers;