"use client";

import React, { useState, useEffect } from "react";
import { Spinner, Pane, Button, toaster, TextInput } from "evergreen-ui";
import CommentsService, {
  Comment,
  CreateCommentPayload,
  UpdateCommentPayload,
} from "@/services/comments.service";

interface CommentManagerProps {
  selected?: string[];
  onSelect?: (ids: string[]) => void;
  eventId?: string;
}

export const CommentManager: React.FC<CommentManagerProps> = ({ eventId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newContent, setNewContent] = useState("");

  const loadComments = async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      const res = await CommentsService.getComments(eventId);
      setComments(res.comments);
    } catch (err) {
      console.error(err);
      toaster.danger("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [eventId]);

  const handleCreate = async () => {
    if (!eventId || !newContent.trim()) return;
    setSaving(true);
    try {
      const payload: CreateCommentPayload = { eventId, content: newContent };
      const res = await CommentsService.createComment(payload);
      setComments([...comments, res.comment]);
      setNewContent("");
      toaster.success("Comment added!");
    } catch (err) {
      console.error(err);
      toaster.danger("Failed to create comment");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string, content: string) => {
    setSaving(true);
    try {
      const payload: UpdateCommentPayload = { content };
      const res = await CommentsService.updateComment(id, payload);
      setComments(comments.map((c) => (c._id === id ? res.comment : c)));
      setEditingId(null);
      toaster.success("Comment updated!");
    } catch (err) {
      console.error(err);
      toaster.danger("Failed to update comment");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    setSaving(true);
    try {
      await CommentsService.deleteComment(id);
      setComments(comments.filter((c) => c._id !== id));
      toaster.success("Comment deleted!");
    } catch (err) {
      console.error(err);
      toaster.danger("Failed to delete comment");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Pane display="flex" justifyContent="center" paddingY={10}>
        <Spinner size={20} />
      </Pane>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-64 overflow-auto border p-2 rounded">
      {comments.map((c) => (
        <div key={c._id} className="flex items-center justify-between gap-2">
          {editingId === c._id ? (
            <TextInput
              value={c.content}
              onChange={(e) => handleUpdate(c._id, e.target.value)}
            />
          ) : (
            <div className="flex-1">{c.content}</div>
          )}
          <div className="flex gap-1">
            <Button
              appearance="minimal"
              intent="warning"
              onClick={() => setEditingId(c._id)}
            >
              Edit
            </Button>
            <Button
              appearance="minimal"
              intent="danger"
              onClick={() => handleDelete(c._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      {eventId && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            className="border p-1 rounded flex-1"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button onClick={handleCreate} intent="success" disabled={saving}>
            {saving ? <Spinner size={16} /> : "Add"}
          </Button>
        </div>
      )}
    </div>
  );
};
