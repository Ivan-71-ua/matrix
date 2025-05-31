import { PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SuccessStep() {
  return (
    <div className="flex  flex-col gap-3 text-center">
      <p className="text-xl flex items-center justify-center gap-2">
        Your test has been successfully created
        <PartyPopper className="text-primary" size="30" />
      </p>
      <p className="text-xl">Thank you for using our platform.</p>
      <div className="pb-12 mt-5">
        <Link className={cn(buttonVariants())} to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
