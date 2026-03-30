import { z } from 'zod';

export const roomSchema = z.object({
  id: z.coerce.number().int().positive(),

  building: z.string().min(1),
  floor: z.string().min(1),
  name: z.string().min(1),
});
export type Room = z.infer<typeof roomSchema>;

export const smartDeviceSchema = z.object({
  id: z.coerce.number().int().positive(),

  brand: z.string().min(3).max(30),
  energy_usage: z.number().int().min(5).max(4900),
  firmware_version: z.string().min(4).max(10),
  last_sync: z
    .string()
    .min(1)
    .refine((val) => new Date(val).getTime() > 0),
  name: z.string().min(3).max(30),
  status: z.enum(['Online', 'Offline']),
});
export type SmartDevice = z.infer<typeof smartDeviceSchema>;

export const roomWithSmartDevicesSchema = roomSchema.extend({
  smartdevices: z.array(smartDeviceSchema),
});
export type RoomWithSmartDevices = z.infer<typeof roomWithSmartDevicesSchema>;

export const smartDeviceWithRoomSchema = smartDeviceSchema.extend({ room: roomSchema });
export type SmartDeviceWithRoom = z.infer<typeof smartDeviceWithRoomSchema>;

export const createSmartDeviceSchame = z.object({
  brand: z.string().min(3).max(30),
  energy_usage: z.number().int().min(5).max(4900),
  firmware_version: z.string().min(4).max(10),
  last_sync: z
    .string()
    .min(1)
    .refine((val) => new Date(val).getTime() > 0),
  name: z.string().min(3).max(30),
  room_id: z.string(),
  status: z.enum(['Online', 'Offline']),
});
export type CreateSmartDeviceData = z.infer<typeof createSmartDeviceSchame>;
