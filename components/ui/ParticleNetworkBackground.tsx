"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSpeed: number;
  radius: number;
  twinkleSpeed: number;
  phase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export default function ParticleNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999 };
    const hasPointer = { value: false };
    let frameId = 0;
    let lastSpawn = 0;

    const points: Point[] = [];
    const shootingStars: ShootingStar[] = [];
    const pointCount = 150;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seedPoints = () => {
      points.length = 0;
      for (let i = 0; i < pointCount; i += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.9,
          vy: (Math.random() - 0.5) * 1.9,
          baseSpeed: 0.7 + Math.random() * 0.5,
          radius: 1.2 + Math.random() * 1.8,
          twinkleSpeed: 0.0015 + Math.random() * 0.003,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const spawnShootingStar = () => {
      if (Math.random() > 0.06) return;

      const fromTop = Math.random() > 0.5;
      const startX = fromTop ? Math.random() * width : -120;
      const startY = fromTop ? -80 : Math.random() * height * 0.35;
      const speed = 8 + Math.random() * 6;

      shootingStars.push({
        x: startX,
        y: startY,
        vx: speed,
        vy: speed * (0.45 + Math.random() * 0.35),
        life: 0,
        maxLife: 46 + Math.floor(Math.random() * 26),
      });
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background gradient orbs for depth
      const orbs = [
        { x: width * 0.15, y: height * 0.25, r: 220, color: "rgba(18, 169, 159, 0.08)" },
        { x: width * 0.85, y: height * 0.15, r: 280, color: "rgba(18, 169, 159, 0.06)" },
        { x: width * 0.5, y: height * 0.8, r: 240, color: "rgba(18, 169, 159, 0.05)" },
        { x: width * 0.2, y: height * 0.7, r: 200, color: "rgba(18, 169, 159, 0.07)" },
      ];

      for (const orb of orbs) {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(18, 169, 159, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Keep the field alive even without pointer input.
      if (!hasPointer.value) {
        pointer.x = width * 0.5 + Math.cos(time * 0.0009) * width * 0.26;
        pointer.y = height * 0.5 + Math.sin(time * 0.0007) * height * 0.2;
      }

      for (const point of points) {
        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 26000) {
          point.vx -= dx * 0.000016;
          point.vy -= dy * 0.000016;
        }

        // Keep each particle moving at a consistent speed so motion never stalls.
        const speed = Math.hypot(point.vx, point.vy);
        if (speed > 0.0001) {
          const scale = point.baseSpeed / speed;
          point.vx *= scale;
          point.vy *= scale;
        } else {
          const angle = Math.random() * Math.PI * 2;
          point.vx = Math.cos(angle) * point.baseSpeed;
          point.vy = Math.sin(angle) * point.baseSpeed;
        }

        point.x += point.vx;
        point.y += point.vy;

        if (point.x < -20 || point.x > width + 20) point.vx *= -1;
        if (point.y < -20 || point.y > height + 20) point.vy *= -1;
      }

      if (time - lastSpawn > 160) {
        spawnShootingStar();
        lastSpawn = time;
      }

      for (let i = 0; i < points.length; i += 1) {
        const p1 = points[i];
        for (let j = i + 1; j < points.length; j += 1) {
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            const alpha = 1 - dist / 220;
            ctx.strokeStyle = `rgba(18, 169, 159, ${alpha * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      for (const point of points) {
        const twinkle = 0.45 + 0.55 * Math.sin(time * point.twinkleSpeed + point.phase);
        ctx.fillStyle = `rgba(63, 215, 141, ${0.35 + twinkle * 0.55})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius * (0.75 + twinkle * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = shootingStars.length - 1; i >= 0; i -= 1) {
        const star = shootingStars[i];
        star.x += star.vx;
        star.y += star.vy;
        star.life += 1;

        const alpha = 1 - star.life / star.maxLife;
        const tailX = star.x - star.vx * 4.5;
        const tailY = star.y - star.vy * 4.5;

        ctx.strokeStyle = `rgba(140, 255, 226, ${Math.max(alpha, 0) * 0.9})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        if (
          star.life >= star.maxLife ||
          star.x > width + 180 ||
          star.y > height + 180
        ) {
          shootingStars.splice(i, 1);
        }
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      hasPointer.value = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const onPointerLeave = () => {
      hasPointer.value = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    setSize();
    seedPoints();
    animate(0);

    window.addEventListener("resize", setSize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-80"
      aria-hidden="true"
    />
  );
}
