import RestClient from "./rest-client";
import get from "lodash/get";

export interface Event {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  tags?: string[];
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  tags?: string[];
  status?: "pending" | "completed" | "cancelled";
}

export interface UpdateEventPayload {
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  tags?: string[];
  status?: "pending" | "completed" | "cancelled";
}

export interface EventResponse {
  event: Event;
}

export interface EventsResponse {
  events: Event[];
}

const createEvent = async (
  payload: CreateEventPayload
): Promise<EventResponse> => {
  try {
    const res = await RestClient.post("/events", payload);
    return res.data;
  } catch (error) {
    throw get(error, ["response", "data", "message"]);
  }
};

const getEvents = async (): Promise<EventsResponse> => {
  try {
    const res = await RestClient.get("/events");
    return res.data;
  } catch (error) {
    throw get(error, ["response", "data", "message"]);
  }
};

const getEventById = async (id: string): Promise<EventResponse> => {
  try {
    const res = await RestClient.get(`/events/${id}`);
    return res.data;
  } catch (error) {
    throw get(error, ["response", "data", "message"]);
  }
};

const updateEvent = async (
  id: string,
  payload: UpdateEventPayload
): Promise<EventResponse> => {
  try {
    const res = await RestClient.put(`/events/${id}`, payload);
    return res.data;
  } catch (error) {
    throw get(error, ["response", "data", "message"]);
  }
};

const deleteEvent = async (id: string): Promise<{ message: string }> => {
  try {
    const res = await RestClient.delete(`/events/${id}`);
    return res.data;
  } catch (error) {
    throw get(error, ["response", "data", "message"]);
  }
};

const EventsService = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};

export default EventsService;
