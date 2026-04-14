import {
  FileTextIcon,
  HelpCircleIcon,
  MailIcon,
  MessageSquareIcon,
} from 'lucide-react';

import { Card } from '@/shared/presentation/atoms/Card';

import {
  LINK_DOCUMENTATION,
  LINK_MAILTO_PRAKASA,
  LINK_START_CHAT,
} from '../../-config';

import { HelpItem } from './_presentation/HelpItem';

export default function AsideHelp() {
  return (
    <Card className="shadow-none h-max rounded-2xl">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 items-center">
            <HelpCircleIcon className="w-6 h-6" />
            <h1 className="text-2xl font-semibold">Help & Support</h1>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300">
            Get assistance with creating your virtual machine
          </p>
        </div>

        <HelpItem
          icon={FileTextIcon}
          title="Documentation"
          description="Read our comprehensive guides on VM creation and management."
          ctaText="View documentation"
          ctaLink={LINK_DOCUMENTATION}
        />
        <HelpItem
          icon={MessageSquareIcon}
          title="Chat team"
          description="Chat with our support team for immediate assistance."
          ctaText="Start Chat"
          ctaLink={LINK_START_CHAT}
        />
        <HelpItem
          icon={MailIcon}
          title="Email support"
          description="Discuss with our team for help and support."
          ctaText="Email support"
          ctaLink={LINK_MAILTO_PRAKASA}
        />
      </div>
    </Card>
  );
}
