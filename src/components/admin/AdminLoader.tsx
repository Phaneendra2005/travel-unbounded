import { Loader2 } from 'lucide-react';

export default function AdminLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4 w-full">
      <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      <p className="text-gray-700 font-medium">{message}</p>
    </div>
  );
}
