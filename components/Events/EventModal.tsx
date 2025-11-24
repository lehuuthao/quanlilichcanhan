"use client";

import React, { useState, useEffect } from "react";
import { Button, toaster, Spinner, Pane } from "evergreen-ui";
import EventsService, {
  Event,
  CreateEventPayload,
  UpdateEventPayload,
} from "@/services/events.service";
import TagsService, { Tag } from "@/services/tags.service";
import FormField from "../FormField";
import { TagManager } from "../TagManager";
import { ReminderManager } from "../ReminderManager";
import RemindersService from "@/services/reminders.service";

interface EventModalProps {
  event?: Event;
  mode: "create" | "edit";
  onClose: () => void;
  onSaved: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  event,
  mode,
  onClose,
  onSaved,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    status: "pending" as "pending" | "completed" | "cancelled",
    tags: [] as string[],
    reminders: [] as string[],
  });

  const [savingEvent, setSavingEvent] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(false);

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState(false);

  const [currentEventId, setCurrentEventId] = useState<string | null>(
    event?._id || null
  );

  // Load tags và set form nếu edit
  useEffect(() => {
    const loadTags = async () => {
      setLoadingTags(true);
      try {
        const res = await TagsService.getTags();
        setAllTags(res.tags);
      } catch (err) {
        console.error(err);
        toaster.danger("Failed to load tags");
      } finally {
        setLoadingTags(false);
      }
    };

    loadTags();

    if (event) {
      setForm({
        title: event.title,
        description: event.description || "",
        startTime: event.startTime,
        endTime: event.endTime,
        status: event.status,
        tags: event.tags?.map((t: any) => t._id) || [],
        reminders: (event as any).reminders?.map((r: any) => r._id) || [],
      });
      setCurrentEventId(event._id);
    }
  }, [event]);

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSavingEvent(true);
      let savedEvent: Event | null | any = null;

      if (mode === "create") {
        savedEvent = await EventsService.createEvent(
          form as CreateEventPayload
        );
        setCurrentEventId(savedEvent._id);
        toaster.success("Event created successfully!");
      } else if (event) {
        savedEvent = await EventsService.updateEvent(
          event._id,
          form as UpdateEventPayload
        );
        toaster.success("Event updated successfully!");
      }

      if (savedEvent) {
        const existing = await RemindersService.getReminders();
        const eventReminders = existing.reminders.filter(
          (r) => r.eventId === savedEvent!._id
        );
        for (const r of eventReminders) {
          await RemindersService.deleteReminder(r._id);
        }
        for (const timeStr of form.reminders) {
          await RemindersService.createReminder({
            eventId: savedEvent._id,
            time: timeStr,
          });
        }
      }
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      toaster.danger("Error saving event");
    } finally {
      setSavingEvent(false);
    }
  };

  const handleDelete = async () => {
    if (!currentEventId || !confirm("Are you sure?")) return;
    try {
      setDeletingEvent(true);
      await EventsService.deleteEvent(currentEventId);
      toaster.success("Event deleted successfully!");
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      toaster.danger("Error deleting event");
    } finally {
      setDeletingEvent(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4 overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold">
          {mode === "create" ? "Create Event" : "Edit Event"}
        </h2>

        <FormField
          label="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <FormField
          label="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          isTextarea
          rows={4}
        />
        <FormField
          label="Start"
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => handleChange("startTime", e.target.value)}
        />
        <FormField
          label="End"
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => handleChange("endTime", e.target.value)}
        />
        <FormField
          label="Status"
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value as any)}
          options={[
            { label: "Pending", value: "pending" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ]}
        />

        {/* Tag Manager */}
        {loadingTags ? (
          <Pane display="flex" justifyContent="center" paddingY={10}>
            <Spinner size={20} />
          </Pane>
        ) : (
          <TagManager
            selected={form.tags}
            onSelect={(ids) => handleChange("tags", ids)}
          />
        )}

        {/* Reminder Manager */}
        {currentEventId && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Reminders</h3>
            <ReminderManager
              key={currentEventId} // force reload khi eventId thay đổi
              selected={form.reminders}
              onSelect={(ids) => handleChange("reminders", ids)}
              eventId={currentEventId}
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          {mode === "edit" && currentEventId && (
            <Button
              intent="danger"
              onClick={handleDelete}
              disabled={deletingEvent}
            >
              {deletingEvent ? <Spinner size={16} /> : "Delete Event"}
            </Button>
          )}
          <Button onClick={onClose} disabled={savingEvent} appearance="minimal">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={savingEvent}
            intent="success"
            iconBefore={savingEvent ? <Spinner size={16} /> : undefined}
          >
            {mode === "create" ? "Create Event" : "Update Event"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
