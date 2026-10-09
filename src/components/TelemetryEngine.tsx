import { useEffect, useRef } from 'react';
import { useApp } from '../state/context';
import { sounds } from '../utils/audio';

export function TelemetryEngine() {
  const { state, dispatch } = useApp();
  const lastScrollY = useRef(0);
  const scrollDistanceAcc = useRef(0);
  const lastMousePos = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: Date.now() });
  const recentClicks = useRef<number[]>([]);
  const lastVelocityPenaltyTime = useRef(0);
  const lastScrollPenaltyTime = useRef(0);

  // Time on site counter
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({
        type: 'UPDATE_METRICS',
        payload: {
          timeOnSiteSeconds: state.metrics.timeOnSiteSeconds + 1,
        },
      });

      // Every 60 seconds of idle browsing
      if ((state.metrics.timeOnSiteSeconds + 1) % 60 === 0) {
        sounds.playDing();
        dispatch({
          type: 'ADD_PENALTY',
          payload: {
            label: 'Dukan Me Khade Hoke Time Pass Karne Ka Fine',
            amount: 18.00,
            category: 'ARBITRARY',
          },
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.metrics.timeOnSiteSeconds, dispatch]);

  // Scroll distance tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      scrollDistanceAcc.current += delta;
      const total = state.metrics.totalPixelsScrolled + delta;

      dispatch({
        type: 'UPDATE_METRICS',
        payload: { totalPixelsScrolled: total },
      });

      // If user scrolls aggressively (> 2200px since last fine)
      const now = Date.now();
      if (scrollDistanceAcc.current > 2200 && now - lastScrollPenaltyTime.current > 6000) {
        scrollDistanceAcc.current = 0;
        lastScrollPenaltyTime.current = now;
        sounds.playRickshawHorn();
        dispatch({
          type: 'ADD_PENALTY',
          payload: {
            label: 'Screen Pe Angutha Ghisne Ka Friction Cess',
            amount: 15.00,
            category: 'SCROLL',
          },
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [state.metrics.totalPixelsScrolled, dispatch]);

  // Mouse velocity tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastMousePos.current.time);
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const velocity = (dist / dt) * 1000; // px per second

      lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };

      if (velocity > 3800 && now - lastVelocityPenaltyTime.current > 8000) {
        lastVelocityPenaltyTime.current = now;
        sounds.playRickshawHorn();
        dispatch({
          type: 'UPDATE_METRICS',
          payload: { cursorVelocityPeaks: state.metrics.cursorVelocityPeaks + 1 },
        });
        dispatch({
          type: 'ADD_PENALTY',
          payload: {
            label: 'Cursor Ko Jhatka Marne Ka Kinetic Penalty',
            amount: 20.00,
            category: 'VELOCITY',
          },
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [state.metrics.cursorVelocityPeaks, dispatch]);

  // Rage click tracker (3 clicks within 450ms)
  useEffect(() => {
    const handleClick = () => {
      const now = Date.now();
      recentClicks.current.push(now);
      recentClicks.current = recentClicks.current.filter((t) => now - t <= 500);

      if (recentClicks.current.length >= 3) {
        recentClicks.current = [];
        sounds.playPressureCooker();
        dispatch({
          type: 'UPDATE_METRICS',
          payload: { rageClicks: state.metrics.rageClicks + 1 },
        });
        dispatch({
          type: 'ADD_PENALTY',
          payload: {
            label: 'Gusse Me Screen Pe Ungli Marne Ka Fine',
            amount: 30.00,
            category: 'RAGE',
          },
        });
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [state.metrics.rageClicks, dispatch]);

  return null;
}
