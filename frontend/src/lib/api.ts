import { z, type ZodType } from 'zod';

class ApiError extends Error {
  constructor(
    public method: string,
    public path: string,
    public status: number,
  ) {
    super(`API ${method} request to ${path} failed with status ${status}`);
    this.name = 'ApiError';
  }
}

export function createApiResponseSchema<T extends ZodType>(dataSchema: T) {
  return z.object({ data: dataSchema });
}

export function DELETE<T>(path: string, schema?: ZodType<T>) {
  return request(path, { method: 'DELETE' }, schema);
}

export function GET<T>(path: string, schema: ZodType<T>) {
  return request(path, undefined, schema);
}

export function POST<T>(path: string, body?: unknown, schema?: ZodType<T>) {
  return request(
    path,
    {
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    },
    schema,
  );
}

export function PUT<T>(path: string, body?: unknown, schema?: ZodType<T>) {
  return request(
    path,
    {
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    },
    schema,
  );
}

async function request<T>(
  path: string,
  options?: RequestInit,
  schema?: ZodType<T>,
): Promise<null | T> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, options);

  if (!res.ok) {
    throw new ApiError(options?.method ?? 'GET', path, res.status);
  }

  if (res.status === 204) return null;

  const json = await res.json();

  return schema ? schema.parse(json) : json;
}
