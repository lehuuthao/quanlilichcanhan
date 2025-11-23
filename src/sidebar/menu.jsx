import { useState, useContext } from "react";
import '../style/menu.css'
import { EventsContext } from '../Layout/layoutMain.jsx';

const Sidebar = () => {
  
  const [isOpen,setIsOpen]=useState(false)
  const { events, addEvent, updateEvent, removeEvent } = useContext(EventsContext);
       const menuItems = [
  
    { id: 1, 
      label: "Add", },
    { id: 2, 
      label: "uppdate", },
    { id: 3, 
      label: "delete", },
    
  ];

  const handleAddEvent = () => {
    const title = window.prompt('Tên sự kiện:', 'Sự kiện mới');
    if (!title) return;
    const dateInput = window.prompt('Ngày giờ bắt đầu (YYYY-MM-DD HH:mm) hoặc để trống để dùng hiện tại:', '');
    let start = dateInput ? new Date(dateInput) : new Date();
    if (isNaN(start)) start = new Date();
    const end = new Date(start.getTime() + 60 * 60 * 1000); // mặc định +1 giờ
    addEvent({ title, start, end });
    setIsOpen(false);
  };



    const handleUpdateEvent = () => {
    if (!events || events.length === 0) {
      alert('Chưa có sự kiện nào để cập nhật.');
      return;
    }
    const list = events.map(ev => `${ev.id} - ${ev.title}`).join('\n');
    const id = Number(window.prompt(`Chọn id sự kiện để cập nhật:\n${list}`));
    if (!id) return;
    const ev = events.find(e => e.id === id);
    if (!ev) { alert('Không tìm thấy id.'); return; }

    const newTitle = window.prompt('Tiêu đề mới:', ev.title) || ev.title;
    const startInput = window.prompt('Bắt đầu (YYYY-MM-DD HH:mm) hoặc để trống giữ nguyên:', ev.start.toISOString().slice(0,16).replace('T',' '));
    let newStart = startInput ? new Date(startInput) : ev.start;
    if (isNaN(newStart)) newStart = ev.start;
    const endInput = window.prompt('Kết thúc (YYYY-MM-DD HH:mm) hoặc để trống +1 giờ từ bắt đầu:', '');
    let newEnd = endInput ? new Date(endInput) : new Date(newStart.getTime() + 60*60*1000);
    if (isNaN(newEnd)) newEnd = new Date(newStart.getTime() + 60*60*1000);

    updateEvent(id, { title: newTitle, start: newStart, end: newEnd });
    setIsOpen(false);
  };


    const handleDeleteEvent = () => {
    if (!events || events.length === 0) {
      alert('Chưa có sự kiện nào để xóa.');
      return;
    }
    const list = events.map(ev => `${ev.id} - ${ev.title}`).join('\n');
    const id = Number(window.prompt(`Chọn id sự kiện để xóa:\n${list}`));
    if (!id) return;
    const ev = events.find(e => e.id === id);
    if (!ev) { alert('Không tìm thấy id.'); return; }
    if (confirm(`Xác nhận xóa sự kiện "${ev.title}"?`)) {
      removeEvent(id);
    }
    setIsOpen(false);
  };


    const handleClick=(type)=>{
    if (type === 1) handleAddEvent();
    if (type === 2) handleUpdateEvent();
    if (type === 3) handleDeleteEvent();
  }
  

    return(
        <>
        <div className="menu">
          <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
          <div className="nav" style={{maxHeight:isOpen?"1000px":"0"}}>
            
         {menuItems.map((item) => (
            <li  key={item.id}> 
              <button  onClick={()=>handleClick(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
          </div>

         </div>

        </>
    )
}
export default Sidebar;