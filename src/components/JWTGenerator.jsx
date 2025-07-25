import React, { useState } from "react";
import {
  Sheet,
  Typography,
  Textarea,
  Input,
  Button,
  Stack,
  IconButton,
} from "@mui/joy";
import ContentCopy from "@mui/icons-material/ContentCopy";

const generateJWT = (payloadObj) => {
  const base64UrlEncode = (obj) =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const header = { alg: "none", typ: "JWT" };
  return `${base64UrlEncode(header)}.${base64UrlEncode(payloadObj)}.`;
};

export default function JWTGenerator({ dark }) {
  const [jwtPayload, setJwtPayload] = useState(
    '{"sub":"1234567890","name":"John Doe","iat":1516239022}'
  );
  const [jwt, setJwt] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    try {
      const payloadObj = JSON.parse(jwtPayload);
      setJwt(generateJWT(payloadObj));
    } catch {
      setJwt("Invalid JSON payload");
    }
  };

  const handleCopy = () => {
    if (!jwt) return;
    navigator.clipboard.writeText(jwt);
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
        sx={{ color: dark ? "#cbd5e1" : undefined }}
      >
        🔏 JWT Generator (Unsigned)
      </Typography>

      <Textarea
        minRows={3}
        value={jwtPayload}
        onChange={(e) => setJwtPayload(e.target.value)}
        placeholder='Enter JSON payload e.g. {"sub":"1234567890","name":"John Doe","iat":1516239022}'
        variant="soft"
        size="md"
        sx={{
          mb: 2,
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
          mb: 2,
        }}
      >
        Generate JWT
      </Button>

      <Input
        readOnly
        value={jwt}
        placeholder="Your JWT will appear here"
        endDecorator={
          <IconButton variant="soft" onClick={handleCopy} disabled={!jwt}>
            <ContentCopy />
          </IconButton>
        }
        sx={{
          fontWeight: 600,
          wordBreak: "break-word",
          color: dark ? "#e2e8f0" : undefined,
          backgroundColor: dark ? "rgba(255 255 255 / 0.05)" : undefined,
          "--Input-placeholderColor": dark ? "#94a3b8" : undefined,
        }}
      />

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
