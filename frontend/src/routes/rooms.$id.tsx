import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { getRoom } from '@/lib/rooms';

export const Route = createFileRoute('/rooms/$id')({
  component: RouteComponent,
  errorComponent: () => (
    <div className="grid h-full min-h-screen place-content-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle />
          </EmptyMedia>
          <EmptyTitle>Nem található</EmptyTitle>
          <EmptyDescription>A keresett termék nem található!</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link to="/">Vissza a főoldalra</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data: room } = useSuspenseQuery(getRoom(id));

  if (!room) throw new Error('Not found');

  return (
    <main className="container flex flex-col pb-12">
      <h1 className="mt-12 mb-6 text-center text-5xl font-bold">{room.data.name}</h1>

      <Link
        className="mx-auto my-2 rounded-md bg-blue-600 p-2 text-white transition-colors hover:bg-blue-500"
        to="/smartdevices/create"
      >
        Új eszköz hozzáadása
      </Link>
    </main>
  );
}
