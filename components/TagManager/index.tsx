"use client";

import React, { useState } from "react";
import {
  Pane,
  TextInput,
  IconButton,
  Spinner,
  toaster,
  Button,
} from "evergreen-ui";
import { useTags } from "@/app/hooks/useTags";
import { Tag } from "@/services/tags.service";
import { EditIcon, TrashIcon, TickIcon, CrossIcon } from "evergreen-ui";

interface TagManagerProps {
  selected: string[];
  onSelect: (ids: string[]) => void;
}

export const TagManager: React.FC<TagManagerProps> = ({
  selected,
  onSelect,
}) => {
  const { tags, addTag, updateTag, deleteTag, loading } = useTags();

  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#5C7AEA");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingColor, setEditingColor] = useState("#5C7AEA");

  const toggleSelect = (id: string) => {
    onSelect(
      selected.includes(id)
        ? selected.filter((t) => t !== id)
        : [...selected, id]
    );
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    try {
      await addTag({ name: newTagName.trim(), color: newTagColor });
      toaster.success("Tag added!");
      setNewTagName("");
      setNewTagColor("#5C7AEA");
    } catch (err) {
      toaster.danger("Failed to add tag");
      console.error(err);
    }
  };

  const startEdit = (tag: Tag) => {
    setEditingId(tag._id);
    setEditingName(tag.name);
    setEditingColor(tag.color || "#5C7AEA");
  };

  const handleUpdateTag = async () => {
    if (!editingId || !editingName.trim()) return;
    try {
      await updateTag(editingId, {
        name: editingName.trim(),
        color: editingColor,
      });
      toaster.success("Tag updated!");
      setEditingId(null);
      setEditingName("");
      setEditingColor("#5C7AEA");
    } catch (err) {
      toaster.danger("Failed to update tag");
      console.error(err);
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm("Are you sure to delete this tag?")) return;
    try {
      await deleteTag(id);
      toaster.success("Tag deleted!");
      onSelect(selected.filter((s) => s !== id));
    } catch (err) {
      toaster.danger("Failed to delete tag");
      console.error(err);
    }
  };

  return (
    <Pane display="flex" flexDirection="column" gap={12}>
      <Pane display="flex" flexWrap="wrap" gap={8}>
        {loading ? (
          <Spinner size={16} />
        ) : (
          tags.map((tag) => (
            <Pane
              key={tag._id}
              display="flex"
              alignItems="center"
              gap={6}
              paddingX={12}
              paddingY={6}
              borderRadius={9999}
              background={tag.color || "#E1E8F0"}
              color={selected.includes(tag._id) ? "#fff" : "#000"}
              border={
                selected.includes(tag._id)
                  ? "2px solid #5C7AEA"
                  : "1px solid #ccc"
              }
              cursor="pointer"
              userSelect="none"
              transition="all 0.2s"
            >
              {editingId === tag._id ? (
                <>
                  <TextInput
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    width={120}
                    height={30}
                    paddingX={6}
                    autoFocus
                  />
                  <input
                    type="color"
                    value={editingColor}
                    onChange={(e) => setEditingColor(e.target.value)}
                    style={{
                      width: 32,
                      height: 32,
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  />
                  <IconButton
                    icon={TickIcon}
                    onClick={handleUpdateTag}
                    size="small"
                  />
                  <IconButton
                    icon={CrossIcon}
                    onClick={() => setEditingId(null)}
                    size="small"
                  />
                </>
              ) : (
                <>
                  <span
                    onClick={() => toggleSelect(tag._id)}
                    style={{ fontWeight: 500 }}
                  >
                    {tag.name}
                  </span>
                  <IconButton
                    icon={EditIcon}
                    onClick={() => startEdit(tag)}
                    size="small"
                  />
                  <IconButton
                    icon={TrashIcon}
                    onClick={() => handleDeleteTag(tag._id)}
                    intent="danger"
                    size="small"
                  />
                </>
              )}
            </Pane>
          ))
        )}
      </Pane>

      {/* Add new tag */}
      <Pane display="flex" gap={6} alignItems="center">
        <TextInput
          placeholder="New tag"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          height={34}
          width={140}
        />
        <input
          type="color"
          value={newTagColor}
          onChange={(e) => setNewTagColor(e.target.value)}
          style={{
            width: 34,
            height: 34,
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        />
        <Button onClick={handleAddTag} intent="success" height={34}>
          Add Tag
        </Button>
      </Pane>
    </Pane>
  );
};
