"use client";

import React, { useState, useEffect } from "react";
import { Button, toaster } from "evergreen-ui";
import EventsService, {
  Event,
  CreateEventPayload,
  UpdateEventPayload,
} from "@/services/events.service";
import FormField from "@/components/FormField";

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
        toaster.success("Event created successfully!");
      } else if (event) {
        await EventsService.updateEvent(event._id, form as UpdateEventPayload);
        toaster.success("Event updated successfully!");
      }
      onSaved();
    } catch (err) {
      console.error("Save event error:", err);
      toaster.danger("Error saving event");
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
      toaster.success("Event deleted successfully!");
      onSaved();
    } catch (err) {
      console.error("Delete event error:", err);
      toaster.danger("Error deleting event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4 ${className}`}
      >
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {mode === "create" ? "Create Event" : "Edit Event"}
            </h2>

            <FormField
              label="Title"
              placeholder="Enter title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              wrapperClass="mb-3"
              customClass="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300"
            />

            <FormField
              label="Description"
              placeholder="Enter description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              isTextarea
              rows={4}
              wrapperClass="mb-3"
              customClass="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300"
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Start"
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                wrapperClass="mb-3"
                customClass="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300"
              />
              <FormField
                label="End"
                type="datetime-local"
                value={form.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                wrapperClass="mb-3"
                customClass="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <FormField
              label="Status"
              value={form.status}
              onChange={(e) =>
                handleChange(
                  "status",
                  e.target.value as "pending" | "completed" | "cancelled"
                )
              }
              options={[
                { label: "Pending", value: "pending" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
              ]}
              wrapperClass="mb-3"
              customClass="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300"
            />

            <div className="flex justify-end gap-3 mt-4">
              {mode === "edit" && (
                <Button
                  intent="danger"
                  onClick={handleDelete}
                  disabled={saving}
                >
                  Delete
                </Button>
              )}
              <Button onClick={onClose} disabled={saving} appearance="minimal">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} intent="success">
                {mode === "create" ? "Create" : "Update"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventModal;
