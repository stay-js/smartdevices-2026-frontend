import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/smartdevices/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/smartdevices/create"!</div>;
}
