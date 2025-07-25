import React, { useState } from "react";
import { Sheet, Typography, Textarea, Input, Button, Stack } from "@mui/joy";

export default function Base64Coder({ dark }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      setOutput(btoa(input));
    } catch {
      setOutput("Invalid input");
    }
  };

  const decode = () => {
    try {
      setOutput(atob(input));
    } catch {
      setOutput("Invalid Base64 string");
    }
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
        sx={{ color: dark ? "#cbd5e1" : undefined }}
      >
        🧩 Base64 Encoder / Decoder
      </Typography>

      <Textarea
        minRows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or Base64 string here"
        variant="soft"
        size="md"
        sx={{
          mb: 2,
          color: dark ? "#e2e8f0" : undefined,
          backgroundColor: dark ? "rgba(255 255 255 / 0.05)" : undefined,
          "--Input-placeholderColor": dark ? "#94a3b8" : undefined,
        }}
      />

      <Stack direction="row" spacing={2} mb={2}>
        <Button
          fullWidth
          size="lg"
          onClick={encode}
          sx={{
            borderRadius: "xl",
            color: "#fff",
          }}
        >
          Encode
        </Button>
        <Button
          fullWidth
          size="lg"
          variant="outlined"
          onClick={decode}
          sx={{
            borderRadius: "xl",
            color: dark ? "#e2e8f0" : undefined,
            ":hover": { color: dark ? "#3b4b5eff" : undefined },
          }}
        >
          Decode
        </Button>
      </Stack>

      <Input
        readOnly
        value={output}
        placeholder="Output will appear here"
        variant="soft"
        sx={{
          fontWeight: 600,
          wordBreak: "break-word",
          color: dark ? "#e2e8f0" : undefined,
          backgroundColor: dark ? "rgba(255 255 255 / 0.05)" : undefined,
          "--Input-placeholderColor": dark ? "#94a3b8" : undefined,
        }}
      />
    </Sheet>
  );
}
