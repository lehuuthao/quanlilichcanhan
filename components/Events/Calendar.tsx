"use client";

import { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import EventsService, { Event as MyEvent } from "@/services/events.service";
import { Tag } from "@/services/tags.service";
import EventModal from "./EventModal";

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);

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
          tags: ev.tags || [],
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
  };

  const handleEventClick = (arg: EventClickArg) => {
    const e = arg.event;
    setSelectedEvent({
      _id: e.id,
      title: e.title,
      startTime: e.startStr,
      endTime: e.endStr,
      status: e.extendedProps.status,
      description: e.extendedProps.description,
      tags: e.extendedProps.tags || [],
      userId: "",
      createdAt: "",
      updatedAt: "",
    });
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
        eventContent={({ event }) => {
          const status = event.extendedProps.status;
          const tags: Tag[] = event.extendedProps.tags || [];
          const bgColor =
            status === "completed"
              ? "bg-green-500"
              : status === "pending"
              ? "bg-yellow-500"
              : "bg-gray-500";

          return (
            <div
              className={`p-1 rounded-md text-sm text-white cursor-pointer ${bgColor}`}
            >
              <div className="font-semibold truncate">{event.title}</div>
              {tags.length > 0 && (
                <div className="flex gap-1 mt-1 flex-wrap">
                  {tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="text-xs px-1 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      />

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          mode={selectedEvent._id ? "edit" : "create"}
          onClose={() => setSelectedEvent(null)}
          onSaved={fetchEvents}
        />
      )}
    </div>
  );
};

export default Calendar;
