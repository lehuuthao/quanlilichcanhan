"use client";

import React, { useState, useEffect } from "react";
import EventsService, {
  Event,
  CreateEventPayload,
  UpdateEventPayload,
} from "@/services/events.service";

interface EventModalProps {
  event?: Event;
  mode: "create" | "edit";
  onClose: () => void;
  onSaved: () => void;
  className?: string;
  loading?: boolean;
}

const EventModal: React.FC<EventModalProps> = ({
  event,
  mode,
  onClose,
  onSaved,
  className = "",
  loading = false,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    status: "pending" as "pending" | "completed" | "cancelled",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title,
        description: event.description || "",
        startTime: event.startTime,
        endTime: event.endTime,
        status: event.status,
      });
    } else {
      setForm({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        status: "pending",
      });
    }
  }, [event]);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (mode === "create") {
        await EventsService.createEvent(form as CreateEventPayload);
      } else if (event) {
        await EventsService.updateEvent(event._id, form as UpdateEventPayload);
      }
      onSaved();
    } catch (err) {
      console.error("Save event error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!event || !confirm("Are you sure you want to delete this event?"))
      return;
    try {
      setSaving(true);
      await EventsService.deleteEvent(event._id);
      onSaved();
    } catch (err) {
      console.error("Delete event error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4 ${className}`}
      >
        {loading || !event ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === "create" ? "Create Event" : "Edit Event"}
            </h2>

            <input
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-20"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Description"
            />

            <div className="grid grid-cols-2 gap-4">
              {["startTime", "endTime"].map((key) => (
                <div key={key}>
                  <label className="text-sm font-medium text-gray-700">
                    {key === "startTime" ? "Start" : "End"}
                  </label>
                  <input
                    type="datetime-local"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form[key as keyof typeof form]}
                    onChange={(e) =>
                      handleChange(key as keyof typeof form, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.status}
                onChange={(e) =>
                  handleChange(
                    "status",
                    e.target.value as "pending" | "completed" | "cancelled"
                  )
                }
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-2">
              {mode === "edit" && (
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
                >
                  Delete
                </button>
              )}
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {mode === "create" ? "Create" : "Update"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventModal;
