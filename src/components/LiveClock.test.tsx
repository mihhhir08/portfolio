import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act, cleanup } from "@testing-library/react";
import LiveClock from "./LiveClock";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("LiveClock", () => {
  it("renders the time for the given timezone", () => {
    vi.useFakeTimers();
    // 2026-07-14 16:00:00 UTC = 12:00 PM in New York (EDT)
    vi.setSystemTime(new Date("2026-07-14T16:00:00Z"));
    render(<LiveClock timezone="America/New_York" data-testid="clock" />);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByText(/12:00:00\sPM/)).toBeInTheDocument();
  });

  it("shows a 3-hour offset between NY and SF", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-14T16:00:00Z"));
    render(
      <>
        <LiveClock timezone="America/New_York" />
        <LiveClock timezone="America/Los_Angeles" />
      </>
    );
    expect(screen.getByText(/12:00:00\sPM/)).toBeInTheDocument();
    expect(screen.getByText(/09:00:00\sAM/)).toBeInTheDocument();
  });

  it("renders nothing visible for an invalid timezone", () => {
    const { container } = render(<LiveClock timezone="Not/AZone" />);
    expect(container.textContent).toBe("");
  });
});
