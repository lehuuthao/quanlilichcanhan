"use client";

import React, { useState } from "react";
import {
  Pane,
  TextInput,
  IconButton,
  Spinner,
  toaster,
  Button,
  Tooltip,
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

  const [hoveredId, setHoveredId] = useState<string | null>(null); // 👈 NEW

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
      toaster.success("Updated!");
      setEditingId(null);
    } catch (err) {
      toaster.danger("Failed to update");
      console.error(err);
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm("Delete this tag?")) return;
    try {
      await deleteTag(id);
      onSelect(selected.filter((s) => s !== id));
      toaster.success("Deleted!");
    } catch (err) {
      toaster.danger("Failed to delete");
      console.error(err);
    }
  };

  return (
    <Pane display="flex" flexDirection="column" gap={12}>
      <Pane display="flex" flexWrap="wrap" gap={10}>
        {loading ? (
          <Spinner size={20} />
        ) : (
          tags.map((tag) => {
            const isSelected = selected.includes(tag._id);
            const isHovered = hoveredId === tag._id;

            return (
              <Pane
                key={tag._id}
                display="flex"
                alignItems="center"
                gap={8}
                paddingX={14}
                paddingY={8}
                borderRadius={999}
                background={tag.color ? `${tag.color}22` : "#E9EEF7"}
                border={
                  isSelected
                    ? `2px solid ${tag.color || "#5C7AEA"}`
                    : "1px solid #D0D7E2"
                }
                cursor="pointer"
                onMouseEnter={() => setHoveredId(tag._id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => toggleSelect(tag._id)}
                style={{
                  transition: "0.15s",
                  minWidth: 90,
                  userSelect: "none",
                }}
              >
                <span style={{ color: "#1A1F36", fontWeight: 500, flex: 1 }}>
                  {tag.name}
                </span>

                {/* SHOW ON HOVER */}
                {isHovered && (
                  <Pane display="flex" gap={4}>
                    <Tooltip content="Edit">
                      <IconButton
                        icon={EditIcon}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(tag);
                        }}
                      />
                    </Tooltip>

                    <Tooltip content="Delete">
                      <IconButton
                        icon={TrashIcon}
                        size="small"
                        intent="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTag(tag._id);
                        }}
                      />
                    </Tooltip>
                  </Pane>
                )}
              </Pane>
            );
          })
        )}
      </Pane>

      {/* EDITING FORM */}
      {editingId && (
        <Pane display="flex" gap={10} alignItems="center" paddingTop={6}>
          <TextInput
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            height={34}
            width={150}
          />

          <input
            type="color"
            value={editingColor}
            onChange={(e) => setEditingColor(e.target.value)}
            style={{
              width: 36,
              height: 36,
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          />

          <IconButton
            icon={TickIcon}
            intent="success"
            onClick={handleUpdateTag}
          />
          <IconButton icon={CrossIcon} onClick={() => setEditingId(null)} />
        </Pane>
      )}

      {/* ADD TAG */}
      <Pane display="flex" gap={10} alignItems="center" marginTop={10}>
        <TextInput
          placeholder="New tag..."
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          height={36}
          width={180}
        />

        <input
          type="color"
          value={newTagColor}
          onChange={(e) => setNewTagColor(e.target.value)}
          style={{
            width: 36,
            height: 36,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        />

        <Button height={36} appearance="primary" onClick={handleAddTag}>
          Add Tag
        </Button>
      </Pane>
    </Pane>
  );
};
