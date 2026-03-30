import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

import { createApiResponseSchema, GET } from '@/lib/api';
import { roomWithSmartDevicesSchema } from '@/lib/zod-schemas';

const roomsResponseSchema = createApiResponseSchema(z.array(roomWithSmartDevicesSchema));
const roomResponseSchema = createApiResponseSchema(roomWithSmartDevicesSchema);

export function getRoom(id: string) {
  return queryOptions({
    queryFn: () => GET(`/rooms${id}`, roomResponseSchema),
    queryKey: ['rooms', 'show', { id }],
  });
}

export function getRooms() {
  return queryOptions({
    queryFn: () => GET('/rooms', roomsResponseSchema),
    queryKey: ['rooms', 'index'],
  });
}
