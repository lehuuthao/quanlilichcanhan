import { useState, useEffect } from "react";
import TagsService, {
  Tag,
  CreateTagPayload,
  UpdateTagPayload,
} from "@/services/tags.service";

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTags = async () => {
    setLoading(true);
    try {
      const res = await TagsService.getTags();
      setTags(res.tags);
    } catch (err) {
      // console.error("Load tags error", err);
    } finally {
      setLoading(false);
    }
  };

  const addTag = async (payload: CreateTagPayload) => {
    const res = await TagsService.createTag(payload);
    setTags((prev) => [...prev, res.tag]);
  };

  const updateTag = async (id: string, payload: UpdateTagPayload) => {
    const res = await TagsService.updateTag(id, payload);
    setTags((prev) => prev.map((t) => (t._id === id ? res.tag : t)));
  };

  const deleteTag = async (id: string) => {
    await TagsService.deleteTag(id);
    setTags((prev) => prev.filter((t) => t._id !== id));
  };

  useEffect(() => {
    loadTags();
  }, []);

  return { tags, loading, loadTags, addTag, updateTag, deleteTag };
};
