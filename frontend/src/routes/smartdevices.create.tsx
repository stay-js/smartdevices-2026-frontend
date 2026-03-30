import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

import { CreateSmartDeviceForm } from '@/components/create-smart-device-form';
import { getRooms } from '@/lib/rooms';
import { createSmartDevice } from '@/lib/smartDevices';

export const Route = createFileRoute('/smartdevices/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { mutate } = useMutation({
    ...createSmartDevice(),
    onError: () => {
      toast.error('Váratlan hiba történt az okoseszköz rögzítése során. Próbálja újra később!');
    },
    onSuccess: (result) =>
      router.navigate({
        params: { id: result?.data.room.id.toString() ?? '' },
        to: '/rooms/$id',
      }),
  });

  const { data: rooms } = useSuspenseQuery(getRooms());

  return (
    <main className="container flex flex-col items-center gap-6 py-12">
      <h1 className="text-center text-2xl font-bold">Okoseszköz rögzítése</h1>

      {rooms && <CreateSmartDeviceForm createSmartDevice={mutate} rooms={rooms.data} />}
    </main>
  );
}
