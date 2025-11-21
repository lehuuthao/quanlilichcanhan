import RestClient from "./rest-client";
import get from "lodash/get";

export interface Tag {
  _id: string;
  userId: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTagPayload {
  name: string;
  color?: string;
}

export interface UpdateTagPayload {
  name?: string;
  color?: string;
}

export interface TagResponse {
  tag: Tag;
}

export interface TagsResponse {
  tags: Tag[];
}

const createTag = async (payload: CreateTagPayload): Promise<TagResponse> => {
  try {
    const response = await RestClient.post("/tags", payload);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess;
  }
};

const getTags = async (): Promise<TagsResponse> => {
  try {
    const response = await RestClient.get("/tags");
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess;
  }
};

const getTagById = async (id: string): Promise<TagResponse> => {
  try {
    const response = await RestClient.get(`/tags/${id}`);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess;
  }
};

const updateTag = async (
  id: string,
  payload: UpdateTagPayload
): Promise<TagResponse> => {
  try {
    const response = await RestClient.put(`/tags/${id}`, payload);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess;
  }
};

const deleteTag = async (id: string): Promise<TagResponse> => {
  try {
    const response = await RestClient.delete(`/tags/${id}`);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess;
  }
};

const TagsService = {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
};

export default TagsService;
