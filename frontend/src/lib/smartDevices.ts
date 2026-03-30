import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

import { createApiResponseSchema, GET, POST } from '@/lib/api';
import { type CreateSmartDeviceData, smartDeviceWithRoomSchema } from '@/lib/zod-schemas';

const smartDeviceResponseSchema = createApiResponseSchema(smartDeviceWithRoomSchema);
const smartDevicesResponseSchema = createApiResponseSchema(z.array(smartDeviceWithRoomSchema));

export function createSmartDevice() {
  return mutationOptions({
    mutationFn: (data: CreateSmartDeviceData) =>
      POST('/smartdevices', data, smartDeviceResponseSchema),
  });
}

export function getSmartDevices() {
  return queryOptions({
    queryFn: () => GET('/smartdevices', smartDevicesResponseSchema),
    queryKey: ['smartdevices', 'index'],
  });
}
