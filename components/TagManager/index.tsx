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
  TickIcon,
  CrossIcon,
  EditIcon,
  TrashIcon,
} from "evergreen-ui";
import { useTags } from "@/app/hooks/useTags";
import { Tag } from "@/services/tags.service";

interface TagManagerProps {
  selected: string[];
  onSelect: (ids: string[]) => void;
}

const TagItem = ({
  tag,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
}: {
  tag: Tag;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (tag: Tag) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <Pane
      display="inline-flex"
      alignItems="center"
      justifyContent="space-between"
      background={isSelected ? tag.color + "55" : tag.color + "22"}
      borderRadius={999}
      paddingX={8}
      paddingY={4}
      cursor="pointer"
      minWidth={40}
      maxWidth={180}
      fontSize={12}
      style={{
        transition: "all 0.2s",
        userSelect: "none",
      }}
      onClick={() => onToggleSelect(tag._id)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = tag.color + "77";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = isSelected
          ? tag.color + "55"
          : tag.color + "22";
      }}
    >
      <span
        style={{
          fontWeight: 500,
          flex: 1,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {tag.name}
      </span>

      <Pane display="flex" gap={4} marginLeft={4} opacity={0.8}>
        <Tooltip content="Edit">
          <IconButton
            icon={EditIcon}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(tag);
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
              onDelete(tag._id);
            }}
          />
        </Tooltip>
      </Pane>
    </Pane>
  );
};

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
    } catch {
      toaster.danger("Failed to add tag");
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
    } catch {
      toaster.danger("Failed to update tag");
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm("Delete this tag?")) return;
    try {
      await deleteTag(id);
      onSelect(selected.filter((s) => s !== id));
      toaster.success("Tag deleted!");
    } catch {
      toaster.danger("Failed to delete tag");
    }
  };

  return (
    <Pane display="flex" flexDirection="column" gap={12}>
      {/* Tag List */}
      <Pane display="flex" flexWrap="wrap" gap={8}>
        {loading ? (
          <Spinner size={20} />
        ) : (
          tags.map((tag) => (
            <TagItem
              key={tag._id}
              tag={tag}
              isSelected={selected.includes(tag._id)}
              onToggleSelect={toggleSelect}
              onEdit={startEdit}
              onDelete={handleDeleteTag}
            />
          ))
        )}
      </Pane>

      {editingId && (
        <Pane display="flex" gap={8} alignItems="center" flexWrap="wrap">
          <TextInput
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            height={32}
            width={140}
          />
          <input
            type="color"
            value={editingColor}
            onChange={(e) => setEditingColor(e.target.value)}
            style={{
              width: 32,
              height: 32,
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

      {/* Add New Tag */}
      <Pane display="flex" gap={8} alignItems="center" flexWrap="wrap">
        <TextInput
          placeholder="New tag..."
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          height={32}
          width={150}
        />
        <input
          type="color"
          value={newTagColor}
          onChange={(e) => setNewTagColor(e.target.value)}
          style={{
            width: 32,
            height: 32,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        />
        <Button height={32} appearance="primary" onClick={handleAddTag}>
          Add Tag
        </Button>
      </Pane>
    </Pane>
  );
};
