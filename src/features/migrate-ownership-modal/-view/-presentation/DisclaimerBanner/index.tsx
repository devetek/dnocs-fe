import { MessageSquareWarningIcon } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <p className="mt-4 text-xs text-primary/70 italic leading-4.5">
      <MessageSquareWarningIcon className="size-4 inline pr-1 -mt-1" />

      <strong>Migration Summary: </strong>
      <span>
        Permissions will be transferred to the new owner immediately. This
        action will revoke existing management access for the current owner.
      </span>
    </p>
  );
}
