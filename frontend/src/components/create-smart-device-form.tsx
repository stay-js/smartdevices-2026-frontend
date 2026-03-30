import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormInput, FormSelect } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { type CreateSmartDeviceData, type Room } from '@/lib/zod-schemas';

const formSchema = z.object({
  brand: z
    .string()
    .min(3, { error: 'A márka min. hossza 3 karakter!' })
    .max(30, { error: 'A márka max. hossza 30 karakter!' }),
  energy_usage: z
    .string()
    .min(1, { error: 'A teljesítmény megadása kötelető! (5 és 4900 közötti egész szám)' })
    .refine(
      (val) => {
        const num = Number(val);
        return Number.isInteger(num) && num >= 5 && num <= 4900;
      },
      {
        error: 'A teljesítmény csak 5 és 4900 közötti egész szám lehet!',
      },
    ),
  firmware_version: z
    .string()
    .min(4, { error: 'A verziószám min. hossza 4 karakter!' })
    .max(10, { error: 'A verziószám max. hossza 10 karakter!' }),
  last_sync: z
    .string()
    .min(1, { error: 'Az utolsó szinkronizáció megadása kötelező' })
    .refine((val) => new Date(val).getTime() > 0, {
      error: 'Az utolsó szinkronizáció csak érvényes dátum lehet.',
    }),
  name: z
    .string()
    .min(3, { error: 'A név min. hossza 3 karakter!' })
    .max(30, { error: 'A név max. hossza 30 karakter!' }),
  room_id: z.string().refine(
    (val) => {
      const num = Number(val);
      return Number.isInteger(num) && num > 0;
    },
    {
      error: 'Kérem válasszon szobát!',
    },
  ),
  status: z.enum(['Online', 'Offline']),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues = {
  brand: '',
  energy_usage: '',
  firmware_version: '',
  last_sync: '',
  name: '',
  room_id: '',
  status: 'Online',
} satisfies FormSchema;

type CreateSmartDeviceFormProps = {
  createSmartDevice: (data: CreateSmartDeviceData) => void;
  rooms: Room[];
};

export function CreateSmartDeviceForm({ createSmartDevice, rooms }: CreateSmartDeviceFormProps) {
  const { control, handleSubmit, reset } = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    createSmartDevice({
      ...data,
      energy_usage: Number(data.energy_usage),
    });
    reset(defaultValues);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Új eszköz rögzítése</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormInput
              control={control}
              label="Eszköz neve"
              name="name"
              placeholder="Eszköz neve"
            />

            <FormSelect
              control={control}
              label="Szoba"
              name="room_id"
              placeholder="Válasszon szobát..."
            >
              <SelectGroup>
                <SelectLabel>Szobák</SelectLabel>

                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id.toString()}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </FormSelect>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                control={control}
                errorPosition="bottom"
                label="Márka"
                name="brand"
                placeholder="Márka"
              />

              <FormSelect
                control={control}
                errorPosition="bottom"
                label="Állapot"
                name="status"
                placeholder="Válasszon állapotot..."
              >
                <SelectGroup>
                  <SelectLabel>Állapotok</SelectLabel>

                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectGroup>
              </FormSelect>

              <FormInput
                control={control}
                errorPosition="bottom"
                label="Teljesítmény (W)"
                name="energy_usage"
                placeholder="5"
              />

              <FormInput
                control={control}
                errorPosition="bottom"
                label="Firmware verzió"
                name="firmware_version"
                placeholder="v1.0.5"
              />
            </div>

            <FormInput
              control={control}
              label="Utolsó szinkronizáció"
              name="last_sync"
              placeholder="yyyy-mm-dd"
            />
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700" size="lg" type="submit">
            Mentés
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
