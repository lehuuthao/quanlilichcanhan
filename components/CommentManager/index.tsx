"use client";

import React, { useState, useEffect } from "react";
import {
  Pane,
  Button,
  Spinner,
  TextInput,
  toaster,
  IconButton,
  Tooltip,
  TickIcon,
  CrossIcon,
} from "evergreen-ui";
import CommentsService, {
  Comment,
  CreateCommentPayload,
  UpdateCommentPayload,
} from "@/services/comments.service";

interface CommentManagerProps {
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
    } catch {
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
    } catch {
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
    } catch {
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
    } catch {
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
    <Pane
      display="flex"
      flexDirection="column"
      gap={8}
      maxHeight={256}
      overflowY="auto"
    >
      {comments.map((c) => (
        <Pane
          key={c._id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding={8}
          borderRadius={6}
          backgroundColor="#f5f6fa"
          border="1px solid #d0d7e2"
          gap={8}
        >
          {editingId === c._id ? (
            <Pane display="flex" alignItems="center" gap={4} flex={1}>
              <TextInput
                value={newContent || c.content}
                onChange={(e) => setNewContent(e.target.value)}
                flex={1}
              />
              <IconButton
                icon={TickIcon}
                intent="success"
                onClick={() => handleUpdate(c._id, newContent || c.content)}
              />
              <IconButton icon={CrossIcon} onClick={() => setEditingId(null)} />
            </Pane>
          ) : (
            <>
              <Pane flex={1}>{c.content}</Pane>
              <Pane display="flex" gap={4}>
                <Tooltip content="Edit">
                  <IconButton
                    icon={TickIcon}
                    size="small"
                    onClick={() => {
                      setEditingId(c._id);
                      setNewContent(c.content);
                    }}
                  />
                </Tooltip>
                <Tooltip content="Delete">
                  <IconButton
                    icon={CrossIcon}
                    size="small"
                    intent="danger"
                    onClick={() => handleDelete(c._id)}
                  />
                </Tooltip>
              </Pane>
            </>
          )}
        </Pane>
      ))}

      {eventId && (
        <Pane display="flex" gap={8} alignItems="center">
          <TextInput
            placeholder="Add a comment..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            flex={1}
          />
          <Button intent="success" onClick={handleCreate} disabled={saving}>
            {saving ? <Spinner size={16} /> : "Add"}
          </Button>
        </Pane>
      )}
    </Pane>
  );
};
