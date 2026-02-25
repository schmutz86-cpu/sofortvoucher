'use client';

export default function DemoBanner() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm font-semibold">
      🎮 DEMO MODE — Test purchases only. No real payment charged.
    </div>
  );
}
