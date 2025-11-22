// app/components/tags/TagForm.tsx
"use client";
import { useState, useEffect } from "react";
import TagsService, {
  CreateTagPayload,
  Tag,
  UpdateTagPayload,
} from "@/services/tags.service";
import toast from "react-hot-toast";

interface TagFormProps {
  tag?: Tag;
  onSuccess: (tag: Tag) => void;
  onCancel?: () => void;
}

const TagForm: React.FC<TagFormProps> = ({ tag, onSuccess, onCancel }) => {
  const [name, setName] = useState(tag?.name || "");
  const [color, setColor] = useState(tag?.color || "#000000");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name) return toast.error("Name is required");
    setLoading(true);
    try {
      let response;
      if (tag) {
        const payload: UpdateTagPayload = { name: name || undefined, color };
        response = await TagsService.updateTag(tag._id, payload);
      } else {
        const payload: CreateTagPayload = { name, color };
        response = await TagsService.createTag(payload);
      }
      onSuccess(response.tag);
      toast.success(tag ? "Tag updated" : "Tag created");
      setName("");
      setColor("#000000");
    } catch (err: any) {
      toast.error(err || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-3 w-full max-w-sm">
      <input
        type="text"
        placeholder="Tag name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-12 h-12 border rounded-md"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md flex-1"
          disabled={loading}
        >
          {loading ? "Saving..." : tag ? "Update" : "Create"}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="bg-gray-300 py-2 px-4 rounded-md flex-1"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default TagForm;
