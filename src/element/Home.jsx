import React, { useState, useCallback, useContext } from 'react'; 
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventsContext} from '../Layout/layoutMain.jsx';

const localizer = momentLocalizer(moment);

const Calendar2 = () => {
  const [date, setDate] = useState(new Date(2025, 10, 15));
  const [view, setView] = useState('month');

 const {events} = useContext(EventsContext);

  // Hàm xử lý khi người dùng bấm Next/Back/Today
  const onNavigate = useCallback((newDate) => {
    setDate(newDate);
  }, [setDate]);

  // Hàm xử lý khi người dùng đổi View
  const onView = useCallback((newView) => {
    setView(newView);
  }, [setView]);

  return (
    <div className='lichhoc' style={{ height: '500px', width: '800px', margin: '0 auto' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        
        // Truyền state và handler 
        date={date}
        onNavigate={onNavigate}
        
        view={view}
        onView={onView}
      />
    </div>
  );
}

export default Calendar2;