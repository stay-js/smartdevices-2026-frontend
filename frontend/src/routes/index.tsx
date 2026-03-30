import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { RoomCard } from '@/components/room-card';
import { getRooms } from '@/lib/rooms';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: rooms } = useSuspenseQuery(getRooms());

  return (
    <main className="container flex flex-col gap-6 py-12">
      <h1 className="text-2xl font-bold">Szobák</h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {rooms?.data.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
