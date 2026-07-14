'use client';

import { useEffect } from 'react';

const Oneko = () => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (typeof window.requestAnimationFrame !== "function") return;

    // Check for reduced motion preference
    const canMatchMedia = typeof window.matchMedia === "function";
    const isReducedMotion = canMatchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    if (isReducedMotion) return;

    // Check if oneko is already present
    if (document.getElementById('oneko')) return;

    const nekoEl = document.createElement("div");
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;

    // Dragging state
    let isDragging = false;
    let draggingPointerId: number | null = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    const hasPointerEvents = "PointerEvent" in window;

    const nekoSpeed = 10;
    const spriteSets: Record<string, [number, number][]> = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, -1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    };

    function setSprite(name: string, frame: number) {
      const set = spriteSets[name];
      if (!set) return;
      const sprite = set[frame % set.length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
        const availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
        if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");
        idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;
      if (isDragging) return;

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    let lastFrameTimestamp: number;
    function onAnimationFrame(timestamp: number) {
      if (!nekoEl.isConnected) return;
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      window.requestAnimationFrame(onAnimationFrame);
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      isDragging = true;
      draggingPointerId = event.pointerId;
      const leftPos = nekoPosX - 16;
      const topPos = nekoPosY - 16;
      dragOffsetX = event.clientX - leftPos;
      dragOffsetY = event.clientY - topPos;
      if (typeof nekoEl.setPointerCapture === "function") {
        nekoEl.setPointerCapture(event.pointerId);
      }
      nekoEl.style.cursor = "grabbing";
      idleTime = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging || event.pointerId !== draggingPointerId) return;
      const left = event.clientX - dragOffsetX;
      const top = event.clientY - dragOffsetY;
      nekoPosX = left + 16;
      nekoPosY = top + 16;
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
      mousePosX = event.clientX;
      mousePosY = event.clientY;
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    };

    const endDrag = (event?: PointerEvent) => {
      if (!isDragging || (event && event.pointerId !== draggingPointerId)) return;
      if (event) {
        if (typeof nekoEl.releasePointerCapture === "function") {
          try { nekoEl.releasePointerCapture(event.pointerId); } catch {}
        }
      }
      isDragging = false;
      draggingPointerId = null;
      nekoEl.style.cursor = "grab";
      mousePosX = nekoPosX;
      mousePosY = nekoPosY;
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      isDragging = true;
      const leftPos = nekoPosX - 16;
      const topPos = nekoPosY - 16;
      dragOffsetX = touch.clientX - leftPos;
      dragOffsetY = touch.clientY - topPos;
      mousePosX = touch.clientX;
      mousePosY = touch.clientY;
      nekoEl.style.cursor = "grabbing";
      idleTime = 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDragging) return;
      const touch = event.touches[0];
      if (!touch) return;
      const left = touch.clientX - dragOffsetX;
      const top = touch.clientY - dragOffsetY;
      nekoPosX = Math.min(Math.max(16, left + 16), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, top + 16), window.innerHeight - 16);
      mousePosX = touch.clientX;
      mousePosY = touch.clientY;
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      nekoEl.style.cursor = "grab";
      mousePosX = nekoPosX;
      mousePosY = nekoPosY;
    };

    // Initialize
    nekoEl.id = "oneko";
    nekoEl.ariaHidden = "true";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.touchAction = "none";
    nekoEl.style.userSelect = "none";
    nekoEl.style.cursor = "grab";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = "2147483647";
    nekoEl.style.backgroundImage = "url('/oneko.gif')";

    document.body.appendChild(nekoEl);
    document.addEventListener("mousemove", handleMouseMove);

    if (hasPointerEvents) {
      nekoEl.addEventListener("pointerdown", handlePointerDown);
      nekoEl.addEventListener("pointermove", handlePointerMove);
      nekoEl.addEventListener("pointerup", endDrag);
      nekoEl.addEventListener("pointercancel", endDrag);
      window.addEventListener("pointerup", endDrag);
    } else {
      nekoEl.addEventListener("touchstart", handleTouchStart, { passive: true });
      nekoEl.addEventListener("touchmove", handleTouchMove, { passive: true });
      nekoEl.addEventListener("touchend", handleTouchEnd);
      nekoEl.addEventListener("touchcancel", handleTouchEnd);
    }

    window.requestAnimationFrame(onAnimationFrame);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (hasPointerEvents) {
        nekoEl.removeEventListener("pointerdown", handlePointerDown);
        nekoEl.removeEventListener("pointermove", handlePointerMove);
        nekoEl.removeEventListener("pointerup", endDrag);
        nekoEl.removeEventListener("pointercancel", endDrag);
        window.removeEventListener("pointerup", endDrag);
      } else {
        nekoEl.removeEventListener("touchstart", handleTouchStart);
        nekoEl.removeEventListener("touchmove", handleTouchMove);
        nekoEl.removeEventListener("touchend", handleTouchEnd);
        nekoEl.removeEventListener("touchcancel", handleTouchEnd);
      }
      if (nekoEl.parentNode) {
        nekoEl.parentNode.removeChild(nekoEl);
      }
    };
  }, []);

  return null;
};

export default Oneko;
