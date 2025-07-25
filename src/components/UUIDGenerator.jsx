import React, { useState } from "react";
import { Sheet, Typography, Input, Button, Stack, IconButton } from "@mui/joy";
import ContentCopy from "@mui/icons-material/ContentCopy";

const generateUUID = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export default function UUIDGenerator({ dark }) {
  const [uuid, setUUID] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => setUUID(generateUUID());
  const handleCopy = () => {
    if (!uuid) return;
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        px: 4,
        py: 3,
        borderRadius: "lg",
        boxShadow: dark ? "none" : "md",
        bgcolor: dark ? "rgba(255 255 255 / 0.05)" : "#fff",
        borderColor: dark
          ? "rgba(255 255 255 / 0.15)"
          : "neutral.outlinedBorder",
      }}
    >
      <Typography
        level="h2"
        fontSize="1.8rem"
        mb={2}
        sx={{ color: dark ? "#e2e8f0" : undefined }}
      >
        🔑 UUID Generator
      </Typography>

      <Input
        readOnly
        value={uuid}
        placeholder="Click Generate UUID"
        endDecorator={
          <IconButton variant="soft" onClick={handleCopy} disabled={!uuid}>
            <ContentCopy />
          </IconButton>
        }
        sx={{
          fontWeight: "600",
          mb: 1,
          userSelect: "all",
          color: dark ? "#e2e8f0" : undefined,
          backgroundColor: dark ? "rgba(255 255 255 / 0.05)" : undefined,
          "--Input-placeholderColor": dark ? "#94a3b8" : undefined,
        }}
      />

      <Button
        fullWidth
        size="lg"
        onClick={handleGenerate}
        sx={{
          borderRadius: "xl",
          color: "#fff",
        }}
      >
        Generate UUID
      </Button>

      {copied && (
        <Typography
          level="body-xs"
          mt={1}
          color="success.plainColor"
          sx={{ color: dark ? "#cbd5e1" : undefined }}
        >
          Copied to clipboard!
        </Typography>
      )}
    </Sheet>
  );
}
