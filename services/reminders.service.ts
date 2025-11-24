import RestClient from "./rest-client";
import get from "lodash/get";

export interface Reminder {
  _id: string;
  userId: string;
  eventId: string;
  time: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReminderPayload {
  eventId: string;
  time: string;
}

export interface UpdateReminderPayload {
  eventId?: string;
  time?: string;
}

export interface ReminderResponse {
  reminder: Reminder;
}

export interface RemindersResponse {
  reminders: Reminder[];
}

const createReminder = async (
  payload: CreateReminderPayload
): Promise<ReminderResponse> => {
  try {
    const response = await RestClient.post("/reminders", payload);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess || "Failed to create reminder";
  }
};

const getReminders = async (): Promise<RemindersResponse> => {
  try {
    const response = await RestClient.get("/reminders");
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess || "Failed to fetch reminders";
  }
};

const getReminderById = async (id: string): Promise<ReminderResponse> => {
  try {
    const response = await RestClient.get(`/reminders/${id}`);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess || "Failed to get reminder";
  }
};

const updateReminder = async (
  id: string,
  payload: UpdateReminderPayload
): Promise<ReminderResponse> => {
  try {
    const response = await RestClient.put(`/reminders/${id}`, payload);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess || "Failed to update reminder";
  }
};

const deleteReminder = async (id: string): Promise<ReminderResponse> => {
  try {
    const response = await RestClient.delete(`/reminders/${id}`);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess || "Failed to delete reminder";
  }
};

const RemindersService = {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
};

export default RemindersService;
