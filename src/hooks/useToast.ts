"use client";

import { useState, useCallback, useRef } from "react";

interface Toast {
  id: number;
  message: string;
  type?: "success" | "info" | "error";
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const showToast = useCallback(
    (message: string, type: Toast["type"] = "success") => {
      const id = ++counter.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2800);
    },
    []
  );

  return { toasts, showToast };
}
