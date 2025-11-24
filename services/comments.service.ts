import RestClient from "./rest-client";
import get from "lodash/get";

export interface Comment {
  _id: string;
  userId: string;
  eventId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentPayload {
  eventId: string;
  content: string;
}

export interface UpdateCommentPayload {
  content: string;
}

export interface CommentResponse {
  comment: Comment;
}

export interface CommentsResponse {
  comments: Comment[];
}

const createComment = async (
  payload: CreateCommentPayload
): Promise<CommentResponse> => {
  try {
    const response = await RestClient.post("/comments", payload);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess || "Failed to create comment";
  }
};

const getComments = async (eventId: string): Promise<CommentsResponse> => {
  try {
    const response = await RestClient.get(`/comments?eventId=${eventId}`);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess || "Failed to fetch comments";
  }
};

const updateComment = async (
  id: string,
  payload: UpdateCommentPayload
): Promise<CommentResponse> => {
  try {
    const response = await RestClient.put(`/comments/${id}`, payload);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess || "Failed to update comment";
  }
};

const deleteComment = async (id: string): Promise<CommentResponse> => {
  try {
    const response = await RestClient.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess || "Failed to delete comment";
  }
};

const CommentsService = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};

export default CommentsService;
