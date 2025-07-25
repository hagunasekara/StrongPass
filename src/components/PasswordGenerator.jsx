import React, { useState } from "react";
import {
  Sheet,
  Typography,
  Input,
  Button,
  Slider,
  Checkbox,
  Stack,
  IconButton,
  LinearProgress,
} from "@mui/joy";
import ContentCopy from "@mui/icons-material/ContentCopy";

const generatePassword = ({
  length,
  uppercase,
  lowercase,
  numbers,
  symbols,
  excludeSimilar,
  excludeAmbiguous,
}) => {
  const similarChars = /[il1Lo0]/g;
  const ambiguous = /[{}[\]/\\(),'";:.<>`~]/g;

  let chars = "";
  if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?/";

  if (excludeSimilar) chars = chars.replace(similarChars, "");
  if (excludeAmbiguous) chars = chars.replace(ambiguous, "");

  if (!chars) return "";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

const getStrength = (password) => {
  const length = password.length;
  const variations = [
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const score = length + variations * 5;
  if (score >= 40) return { level: "Strong", emoji: "🟢", value: 90 };
  if (score >= 25) return { level: "Fair", emoji: "🟡", value: 60 };
  return { level: "Weak", emoji: "🔴", value: 30 };
};

export default function PasswordGenerator({ dark }) {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const strength = getStrength(password);

  const handleGenerate = () => {
    setPassword(
      generatePassword({
        length,
        uppercase,
        lowercase,
        numbers,
        symbols,
        excludeSimilar,
        excludeAmbiguous,
      })
    );
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
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
        🔐 Generate a strong password
      </Typography>

      <Input
        readOnly
        value={password}
        placeholder="Click Generate"
        endDecorator={
          <IconButton variant="soft" onClick={handleCopy} disabled={!password}>
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

      {password && (
        <>
          <Typography
            level="body-sm"
            mb={1}
            sx={{ color: dark ? "#cbd5e1" : undefined }}
          >
            Strength: {strength.level} {strength.emoji}
          </Typography>
          <LinearProgress
            determinate
            value={strength.value}
            color={
              strength.level === "Strong"
                ? "success"
                : strength.level === "Fair"
                ? "warning"
                : "danger"
            }
            sx={{ borderRadius: "xl", mb: 2 }}
          />
        </>
      )}

      <Typography
        level="body-sm"
        mb={0.5}
        sx={{ color: dark ? "#cbd5e1" : undefined }}
      >
        Password length: {length}
      </Typography>
      <Slider
        min={4}
        max={64}
        value={length}
        onChange={(e, val) => setLength(val)}
        sx={{ mb: 2 }}
      />

      <Stack spacing={1} mb={2}>
        <Checkbox
          label="Include Uppercase letters"
          checked={uppercase}
          onChange={(e) => setUppercase(e.target.checked)}
          sx={{
            color: dark ? "#f3f4f6" : undefined,
          }}
        />
        <Checkbox
          label="Include Lowercase letters"
          checked={lowercase}
          onChange={(e) => setLowercase(e.target.checked)}
          sx={{
            color: dark ? "#f3f4f6" : undefined,
          }}
        />
        <Checkbox
          label="Include Numbers"
          checked={numbers}
          onChange={(e) => setNumbers(e.target.checked)}
          sx={{
            color: dark ? "#f3f4f6" : undefined,
          }}
        />
        <Checkbox
          label="Include Symbols"
          checked={symbols}
          onChange={(e) => setSymbols(e.target.checked)}
          sx={{
            color: dark ? "#f3f4f6" : undefined,
          }}
        />
        <Checkbox
          label="Exclude Similar characters (i, l, 1, o, 0)"
          checked={excludeSimilar}
          onChange={(e) => setExcludeSimilar(e.target.checked)}
          sx={{
            color: dark ? "#f3f4f6" : undefined,
          }}
        />
        <Checkbox
          label="Exclude Ambiguous characters ([{}/\\ etc.)"
          checked={excludeAmbiguous}
          onChange={(e) => setExcludeAmbiguous(e.target.checked)}
          sx={{
            color: dark ? "#f3f4f6" : undefined,
          }}
        />
      </Stack>

      <Button
        fullWidth
        size="lg"
        onClick={handleGenerate}
        sx={{
          borderRadius: "xl",
          color: "#fff",
        }}
      >
        Generate Password
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
