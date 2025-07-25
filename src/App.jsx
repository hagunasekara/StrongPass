import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Link,
} from "@mui/joy";
import { Sun, Moon } from "lucide-react";

import PasswordGenerator from "./components/PasswordGenerator";
import UUIDGenerator from "./components/UUIDGenerator";
import JWTGenerator from "./components/JWTGenerator";
import Base64Coder from "./components/Base64Coder";

const tabs = [
  { id: 0, label: "Password Generator" },
  { id: 1, label: "UUID Generator" },
  { id: 2, label: "JWT Generator" },
  { id: 3, label: "Base64 Encoder" },
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDark(prefersDark);
  }, []);

  const textColor = dark ? "#e2e8f0" : "#1e293b";
  const textColorSec = dark ? "#6d7785ff" : "#495c7aff";

  return (
    <Box
      sx={{
        bgcolor: dark ? "#0f172a" : "#f8fafc",
        minHeight: "100dvh",
        width: "100vw",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      <CssBaseline enableColorScheme />

      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: dark ? "1px solid #334155" : "1px solid #e2e8f0",
        }}
      >
        <Typography
          level="h1"
          textColor={textColor}
          fontSize="1.9rem"
          fontWeight="700"
          sx={{ userSelect: "none" }}
        >
          Strong Pass{" "}
          <Typography
            level="h3"
            textColor={textColorSec}
            fontSize="1rem"
            fontWeight="700"
            sx={{ userSelect: "none" }}
          >
            by DevLagom
          </Typography>
        </Typography>

        <IconButton
          variant="soft"
          onClick={() => setDark(!dark)}
          aria-label="Toggle dark mode"
          size="sm"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        sx={{
          px: 3,
          py: 1,
          borderBottom: dark ? "1px solid #334155" : "1px solid #e2e8f0",
          bgcolor: dark ? "rgba(255 255 255 / 0.05)" : "transparent",
        }}
      >
        {tabs.map(({ id, label }) => (
          <Button
            key={id}
            variant={activeTab === id ? "solid" : "plain"}
            color={activeTab === id ? "primary" : "neutral"}
            size="sm"
            onClick={() => setActiveTab(id)}
            sx={{
              fontWeight: 700,
              borderRadius: "xl",
              color:
                activeTab === id ? undefined : dark ? "#cbd5e1" : undefined,
              ":hover": {
                backgroundColor:
                  activeTab === id ? undefined : dark ? "#333c46ff" : undefined,
                color:
                  activeTab === id ? undefined : dark ? "#c7d0dbff" : undefined,
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Stack>

      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          maxWidth: 700,
          mx: "auto",
          width: "100%",
          overflowY: "auto",
        }}
      >
        {activeTab === 0 && <PasswordGenerator dark={dark} />}
        {activeTab === 1 && <UUIDGenerator dark={dark} />}
        {activeTab === 2 && <JWTGenerator dark={dark} />}
        {activeTab === 3 && <Base64Coder dark={dark} />}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          fontSize: "0.9rem",
          color: dark ? "rgba(255 255 255 / 0.5)" : "rgba(0 0 0 / 0.5)",
          borderTop: dark ? "1px solid #334155" : "1px solid #e2e8f0",
          userSelect: "none",
        }}
      >
        Made with ❤️ by{" "}
        <Link href="https://devlagom.com/" underline="always" target="_blank">
          DevLagom
        </Link>
      </Box>
    </Box>
  );
}
