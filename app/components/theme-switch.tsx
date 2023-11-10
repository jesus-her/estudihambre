"use client";

import { useTheme } from "@/app/context/theme-context";
import { Switch } from "@nextui-org/react";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      isSelected={theme === "dark" ? true : false}
      size="sm"
      color="warning"
      startContent={<BsSun />}
      endContent={<BsMoon />}
      onClick={toggleTheme}
    ></Switch>
  );
}
