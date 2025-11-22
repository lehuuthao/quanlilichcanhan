// app/components/tags/TagItem.tsx

import { Tag } from "@/services/tags.service";

interface TagItemProps {
  tag: Tag;
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
}

const TagItem: React.FC<TagItemProps> = ({ tag, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
      <div className="flex items-center gap-3">
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: tag.color }}
        />
        <span className="font-medium">{tag.name}</span>
      </div>
      <div className="flex gap-2">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => onEdit(tag)}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => onDelete(tag)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TagItem;
