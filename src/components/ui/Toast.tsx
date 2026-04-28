"use client";

interface Toast {
  id: number;
  message: string;
  type?: "success" | "info" | "error";
}

const DOT_COLOR: Record<string, string> = {
  success: "#7ec88a",
  info: "#7ab3e0",
  error: "#e8726a",
};

export function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-7 right-7 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2.5 px-[18px] py-3 rounded-xl text-[13px] animate-toast-in"
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border2)",
            color: "var(--text)",
          }}
        >
          <div
            className="w-[7px] h-[7px] rounded-full shrink-0"
            style={{ background: DOT_COLOR[t.type ?? "success"] }}
          />
          {t.message}
        </div>
      ))}
    </div>
  );
}
