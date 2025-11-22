// app/components/tags/TagList.tsx
"use client";
import { useState, useEffect } from "react";
import TagsService, { Tag } from "@/services/tags.service";
import TagItem from "./TagItem";
import TagForm from "./TagForm";
import toast from "react-hot-toast";

const TagList: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const fetchTags = async () => {
    try {
      const res = await TagsService.getTags();
      setTags(res.tags);
    } catch (err: any) {
      toast.error(err || "Failed to load tags");
    }
  };

  const handleDelete = async (tag: Tag) => {
    if (!confirm(`Delete tag ${tag.name}?`)) return;
    try {
      await TagsService.deleteTag(tag._id);
      setTags(tags.filter((t) => t._id !== tag._id));
      toast.success("Tag deleted");
    } catch (err: any) {
      toast.error(err || "Failed to delete tag");
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <TagForm
        onSuccess={(newTag) => setTags([newTag, ...tags])}
        key={editingTag?._id || "new"}
      />
      {tags.map((tag) => (
        <TagItem
          key={tag._id}
          tag={tag}
          onEdit={(t) => setEditingTag(t)}
          onDelete={handleDelete}
        />
      ))}
      {editingTag && (
        <TagForm
          tag={editingTag}
          onSuccess={(updatedTag) => {
            setTags(
              tags.map((t) => (t._id === updatedTag._id ? updatedTag : t))
            );
            setEditingTag(null);
          }}
          onCancel={() => setEditingTag(null)}
        />
      )}
    </div>
  );
};

export default TagList;
