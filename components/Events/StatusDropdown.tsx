import { Pane, Button, Menu } from "evergreen-ui";
import { useState } from "react";

const StatusDropdown = ({
  value,
  onChange,
}: {
  value: "pending" | "completed" | "cancelled";
  onChange: (v: "pending" | "completed" | "cancelled") => void;
}) => {
  const [open, setOpen] = useState(false);
  const options: Array<"pending" | "completed" | "cancelled"> = [
    "pending",
    "completed",
    "cancelled",
  ];

  return (
    <Pane position="relative" width="100%">
      <Button width="100%" onClick={() => setOpen((o) => !o)}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </Button>

      {open && (
        <Pane
          position="absolute"
          top="100%"
          left={0}
          width="100%"
          background="white"
          border
          borderRadius={4}
          boxShadow="0 0 4px rgba(0,0,0,0.2)"
          zIndex={10}
        >
          {options.map((s) => (
            <Pane
              key={s}
              padding={8}
              cursor="pointer"
              background="white"
              // wrap với CSS pseudo class
              style={{
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f0f0f0")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              width="100%"
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Pane>
          ))}
        </Pane>
      )}
    </Pane>
  );
};

export default StatusDropdown;
