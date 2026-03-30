import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { type SmartDevice } from '@/lib/zod-schemas';

const COLUMNS = [
  'Eszköz neve',
  'Márka',
  'Állapot',
  'Teljesítmény',
  'Firmware verzió',
  'Utolsó szinkronizáció',
];

export function SmartDevicesTable({ smartdevices }: { smartdevices: SmartDevice[] }) {
  return (
    <div className="mx-auto w-3/4 overflow-hidden rounded-md border-2 border-blue-700">
      <Table>
        <TableHeader className="bg-blue-700">
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead className="p-3 text-white" key={col}>
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {smartdevices.map((device, index) => (
            <TableRow className={cn((index + 1) % 2 == 0 && 'bg-blue-100')} key={device.id}>
              <TableCell className="p-3">{device.name}</TableCell>
              <TableCell className="p-3">{device.brand}</TableCell>

              <TableCell className="p-3">
                <span
                  className={cn(
                    'rounded-md border p-2 text-white',
                    device.status === 'Online'
                      ? 'border-emerald-700 bg-emerald-600'
                      : 'border-red-700 bg-red-600',
                  )}
                >
                  {device.status}
                </span>
              </TableCell>

              <TableCell
                className={cn('p-3', device.energy_usage > 500 && 'font-bold text-red-600')}
              >
                {device.energy_usage} W
              </TableCell>

              <TableCell className="p-3">{device.firmware_version}</TableCell>
              <TableCell className="p-3">{device.last_sync}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
