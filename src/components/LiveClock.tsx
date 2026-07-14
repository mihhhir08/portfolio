"use client";

import { useEffect, useState } from "react";

type Props = {
  timezone: string;
  seconds?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function LiveClock({ timezone, seconds = true, ...rest }: Props) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("en-US", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            ...(seconds ? { second: "2-digit" } : {}),
          })
        );
      } catch {
        setTime("");
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [timezone, seconds]);

  return (
    <span suppressHydrationWarning {...rest}>
      {time}
    </span>
  );
}
