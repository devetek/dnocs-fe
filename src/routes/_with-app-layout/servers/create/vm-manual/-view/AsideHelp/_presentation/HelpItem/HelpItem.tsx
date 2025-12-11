import type { ReactNode } from 'react';

import { Link } from '@tanstack/react-router';
import { ExternalLinkIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/Button';

export default function HelpItem(props: Props) {
  const { icon: Icon, title, description, ctaText, ctaLink } = props;

  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0">
        <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="link" className="h-auto p-0 text-sm" asChild>
          <Link to={ctaLink} className="flex items-center gap-1">
            {ctaText} <ExternalLinkIcon className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

interface Props {
  icon: (props: { className?: string }) => ReactNode;
  title: string;
  description: string;
  ctaLink: string;
  ctaText: string;
}
