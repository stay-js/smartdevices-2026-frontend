import { Link } from '@tanstack/react-router';

import { type Room } from '@/lib/zod-schemas';

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link params={{ id: room.id.toString() }} to="/rooms/$id">
      <div className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600">
              {room.name}
            </h3>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              {room.building}
            </span>
          </div>

          <p className="flex items-center text-sm text-slate-500">
            <span className="mr-2 h-4 w-4 shrink-0 rounded-full bg-slate-100"></span>
            {room.floor}
          </p>
        </div>
      </div>
    </Link>
  );
}
