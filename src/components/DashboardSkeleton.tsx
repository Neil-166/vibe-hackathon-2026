import Skeleton from './Skeleton';

/**
 * Shimmering skeleton that mirrors the dashboard layout
 * while data hydrates. Shows for ~400ms on mount.
 */
export default function DashboardSkeleton() {
  return (
    <div className="relative mx-auto max-w-lg space-y-7 px-5 pt-6" aria-label="Loading dashboard" aria-busy="true">
      {/* Today's task card */}
      <Skeleton className="h-[152px] w-full rounded-2xl" />

      {/* Progress section */}
      <Skeleton className="h-[140px] w-full rounded-2xl" />

      {/* Progress timeline */}
      <Skeleton className="h-[96px] w-full rounded-2xl" />

      {/* Achievements */}
      <Skeleton className="h-[80px] w-full rounded-2xl" />

      {/* GitHub graph */}
      <Skeleton className="h-[120px] w-full rounded-2xl" />

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-[100px] rounded-2xl" />
        <Skeleton className="h-[100px] rounded-2xl" />
      </div>
    </div>
  );
}
