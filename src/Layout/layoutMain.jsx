import {Outlet} from "react-router-dom";
import Header from '../header/header.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import '../style/layout.css';
const layoutmain =()=>{
    return(
        <>
         

          <header>
            <Header />
          </header>

          <div className="layoutMain">

          <aside className="sidebar">
            <Sidebar/>
          </aside> 

          <main className="tinchinh">
          <Outlet/>
          </main>

         </div>
          
        </>
    )
}

export default layoutmain;
