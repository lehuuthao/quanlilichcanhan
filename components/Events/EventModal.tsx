"use client";

import React, { useState, useEffect } from "react";
import {
  Pane,
  TextInputField,
  TextareaField,
  SelectMenu,
  Button,
  toaster,
  Spinner,
  Badge,
  Popover,
  Position,
  Menu,
} from "evergreen-ui";
import EventsService, {
  Event,
  CreateEventPayload,
  UpdateEventPayload,
} from "@/services/events.service";
import TagsService, { Tag } from "@/services/tags.service";
import { TagManager } from "../TagManager";
import { ReminderManager } from "../ReminderManager";
import RemindersService from "@/services/reminders.service";
import { CommentManager } from "../CommentManager";
import StatusDropdown from "./StatusDropdown";

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
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<string | null>(
    event?._id || null
  );
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  useEffect(() => {
    const loadTags = async () => {
      setLoadingTags(true);
      try {
        const res = await TagsService.getTags();
        setAllTags(res.tags);
      } catch {
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
        reminders: (event as any).reminders?.map((r: any) => r.time) || [],
      });
      setCurrentEventId(event._id);
    }
  }, [event]);

  const handleChange = (key: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      setSaving(true);
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
        // Sync reminders
        const existing = await RemindersService.getReminders();
        const eventReminders = existing.reminders.filter(
          (r) => r.eventId === savedEvent!._id
        );
        for (const r of eventReminders)
          await RemindersService.deleteReminder(r._id);
        for (const timeStr of form.reminders) {
          if (!timeStr || isNaN(Date.parse(timeStr))) continue;
          await RemindersService.createReminder({
            eventId: savedEvent._id,
            time: new Date(timeStr).toISOString(),
          });
        }
      }

      onSaved();
      onClose();
    } catch {
      toaster.danger("Error saving event");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentEventId || !confirm("Are you sure?")) return;
    try {
      setDeleting(true);
      await EventsService.deleteEvent(currentEventId);
      toaster.success("Event deleted successfully!");
      onSaved();
      onClose();
    } catch {
      toaster.danger("Error deleting event");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Pane
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      background="rgba(0,0,0,0.4)"
      zIndex={9999}
      onClick={onClose}
    >
      <Pane
        background="white"
        borderRadius={24}
        padding={24}
        width="100%"
        maxWidth={600}
        maxHeight="90vh"
        overflow="auto"
        display="flex"
        flexDirection="column"
        gap={16}
        onClick={(e) => e.stopPropagation()}
      >
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <h2>{mode === "create" ? "Create Event" : "Edit Event"}</h2>
          <Button appearance="minimal" onClick={onClose}>
            ×
          </Button>
        </Pane>

        {/* Form Fields */}
        <TextInputField
          label="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <TextareaField
          label="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          height={80}
        />

        <Pane display="flex" gap={16}>
          <TextInputField
            label="Start"
            type="datetime-local"
            value={form.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
          />
          <TextInputField
            label="End"
            type="datetime-local"
            value={form.endTime}
            onChange={(e) => handleChange("endTime", e.target.value)}
          />
        </Pane>

        {/* Status */}

        <StatusDropdown
          value={form.status}
          onChange={(v) => handleChange("status", v)}
        />
        {/* Tags */}
        <Pane border padding={12} borderRadius={8} background="tint1">
          <h4>Tags</h4>
          {loadingTags ? (
            <Spinner />
          ) : (
            <TagManager
              selected={form.tags}
              onSelect={(ids) => handleChange("tags", ids)}
            />
          )}
        </Pane>

        {/* Reminders */}
        {currentEventId && (
          <Pane border padding={12} borderRadius={8} background="tint1">
            <h4>Reminders</h4>
            <ReminderManager
              selected={form.reminders}
              onSelect={(ids) => handleChange("reminders", ids)}
              eventId={currentEventId}
            />
          </Pane>
        )}

        {/* Comments */}
        {currentEventId && (
          <Pane border padding={12} borderRadius={8} background="tint1">
            <h4>Comments</h4>
            <CommentManager eventId={currentEventId} />
          </Pane>
        )}

        {/* Actions */}
        <Pane display="flex" justifyContent="flex-end" gap={8}>
          {mode === "edit" && currentEventId && (
            <Button intent="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Spinner size={16} /> : "Delete"}
            </Button>
          )}
          <Button appearance="minimal" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            intent="success"
            onClick={handleSave}
            disabled={saving}
            iconBefore={saving ? <Spinner size={16} /> : undefined}
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default EventModal;
