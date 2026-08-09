import { useEffect, useState } from 'react';
import { Clock, Flame } from 'lucide-react';

/**
 * Live countdown to midnight — "Streak expires in HH:MM:SS".
 * Resets each day. The urgency drives nightly habit formation.
 */
export default function StreakCountdown() {
  const [remaining, setRemaining] = useState(() => getRemaining());

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const urgent = remaining.totalMs < 2 * 60 * 60 * 1000; // last 2 hours

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-4 ${
        urgent
          ? 'border-warning/30 bg-warning/[0.07]'
          : 'border-border bg-surface'
      } shadow-[0_4px_24px_rgba(0,0,0,0.2)]`}
    >
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${urgent ? 'bg-warning/15' : 'bg-primary/15'}`}>
        {urgent ? (
          <Flame className="h-5 w-5 text-warning flame-pulse" />
        ) : (
          <Clock className="h-5 w-5 text-primary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">
          {urgent ? 'Streak expiring soon' : 'Streak window'}
        </p>
        <p className="mt-0.5 font-mono text-[18px] font-bold tabular-nums text-foreground">
          {remaining.hrs}:{remaining.mins}:{remaining.secs}
        </p>
      </div>
      <p className="max-w-[120px] text-right text-[10px] leading-snug text-subtle">
        {urgent ? 'Submit before midnight!' : 'Submit tonight to keep your streak.'}
      </p>
    </div>
  );
}

function getRemaining() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const ms = Math.max(0, midnight.getTime() - now.getTime());
  const hrs = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, '0');
  const mins = String(Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const secs = String(Math.floor((ms % (1000 * 60)) / 1000)).padStart(2, '0');
  return { hrs, mins, secs, totalMs: ms };
}
