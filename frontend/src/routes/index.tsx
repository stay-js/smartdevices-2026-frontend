import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { CheckCircleIcon } from 'lucide-react';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { GET } from '@/lib/api';

const helloSchema = z.object({
  message: z.string(),
});

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryFn: () => GET('/api/hello', helloSchema),
    queryKey: ['hello'],
  });

  return (
    <div className="grid min-h-screen place-content-center">
      <div className="flex flex-col items-center gap-4">
        <div>
          Message: <span>{isLoading ? 'Loading...' : data?.message}</span>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg">Click me</Button>
          </AlertDialogTrigger>

          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia>
                <CheckCircleIcon className="size-6" />
              </AlertDialogMedia>
              Success!
            </AlertDialogHeader>

            <AlertDialogDescription>
              Everything up until this point is working!
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
