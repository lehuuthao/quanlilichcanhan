import {Outlet} from "react-router-dom";
import Header from '../header/header.jsx';
import Sidebar from '../sidebar/menu.jsx';
import '../style/layout.css';
import React, {createContext, useState } from 'react';

export const EventsContext = createContext();

const layoutmain =()=>{
    const [events, setEvents] = useState([
        {
          id: 0,
          title: '',
          start: '',
          end: '',
        },
      ]);

      const generateTwoDigitId = () => {
        const used = new Set(events.map(e => e.id));
        for (let i = 0; i < 90; i++) {
          const id = Math.floor(Math.random() * 90) + 10; // 10..99
          if (!used.has(id)) return id;
        }
        // nếu hết (hiếm), fallback về timestamp
        return Date.now();
      };

      

      const addEvent = (evt) => {
        const id = generateTwoDigitId();
         setEvents((prev) => [...prev, { id, ...evt }]);
      };

      const updateEvent = (id, updates) => {
      setEvents(prev => prev.map(ev => ev.id === id ? { ...ev, ...updates } : ev));
    };

    const removeEvent = (id) => {
      setEvents(prev => prev.filter(ev => ev.id !== id));
    };



    return(
      <EventsContext.Provider value={{ events, addEvent, updateEvent, removeEvent }}>
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
        </EventsContext.Provider>
    )
}

export default layoutmain;
