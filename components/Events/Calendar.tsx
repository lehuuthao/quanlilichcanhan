// components/Calendar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import EventsService, { Event as MyEvent } from "@/services/events.service";
import EventModal from "./EventModal";

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [loadingEvent, setLoadingEvent] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await EventsService.getEvents();
      const mapped = res.events.map((ev) => ({
        id: ev._id,
        title: ev.title,
        start: ev.startTime,
        end: ev.endTime,
        extendedProps: {
          description: ev.description,
          status: ev.status,
          tags: ev.tags,
        },
      }));
      setEvents(mapped);
    } catch (err) {
      console.error("Fetch events error:", err);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Khi click vào ngày trống
  const handleDateClick = (arg: DateClickArg) => {
    setSelectedEvent({
      _id: "",
      title: "",
      startTime: arg.dateStr,
      endTime: arg.dateStr,
      status: "pending",
      userId: "",
      createdAt: "",
      updatedAt: "",
    });
    setModalMode("create");
    setModalOpen(true);
  };

  // Khi click vào sự kiện
  const handleEventClick = (arg: EventClickArg) => {
    const e = arg.event;

    // Lấy dữ liệu trực tiếp từ event
    setSelectedEvent({
      _id: e.id,
      title: e.title,
      startTime: e.startStr,
      endTime: e.endStr,
      status: e.extendedProps.status,
      description: e.extendedProps.description,
      tags: e.extendedProps.tags || [],
      userId: "", // có thể bỏ trống nếu không cần
      createdAt: "",
      updatedAt: "",
    });

    setModalMode("edit");
    setModalOpen(true);
  };

  const handleEventSaved = () => {
    setModalOpen(false);
    fetchEvents();
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        eventContent={(arg) => {
          const { event } = arg;
          const status = event.extendedProps.status;
          const tags = event.extendedProps.tags as string[] | undefined;

          const bgColor =
            status === "completed"
              ? "bg-green-500"
              : status === "pending"
              ? "bg-yellow-500"
              : "bg-gray-500";

          return (
            <div
              className={`p-1 rounded-md text-sm text-white cursor-pointer ${bgColor} hover:scale-105 transition-transform duration-150`}
            >
              <div className="font-semibold truncate">{event.title}</div>
              {tags && tags.length > 0 && (
                <div className="flex gap-1 mt-1 flex-wrap">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-white/30 text-xs px-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      />

      {modalOpen && (
        <EventModal
          event={selectedEvent || undefined} // pass undefined nếu chưa load
          mode={modalMode}
          onClose={() => setModalOpen(false)}
          onSaved={handleEventSaved}
          loading={loadingEvent} // thêm prop loading
          className="animate-slide-in rounded-2xl p-6 shadow-xl"
        />
      )}
    </div>
  );
};

export default Calendar;
