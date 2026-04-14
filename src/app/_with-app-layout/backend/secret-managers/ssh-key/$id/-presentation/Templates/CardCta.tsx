import { useRef, useState } from 'react';

import { MenuIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/Button';
import { Dropdown } from '@/shared/presentation/atoms/Dropdown';

export default function TemplateCardCta(props: TemplateCardCtaProps) {
  const { mainText, additionals } = props;

  const refDropdownTarget = useRef<HTMLButtonElement>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="p-3 pt-0 flex gap-1">
      <div className="flex-1">{mainText}</div>

      {additionals && additionals.length > 0 && (
        <>
          <Button
            ref={refDropdownTarget}
            size="sm"
            variant="secondary"
            onClick={() => setDropdownOpen(true)}
          >
            <MenuIcon width={16} height={16} />
          </Button>

          <Dropdown
            refTarget={refDropdownTarget}
            isOpen={dropdownOpen}
            alignment="right"
            onClickOutside={() => setDropdownOpen(false)}
          >
            <div className="p-2 flex flex-col">
              {additionals.map((additional, idx) => {
                const { text, className, persistOnClick, onClick } = additional;

                const handleClick = () => {
                  if (!persistOnClick) {
                    setDropdownOpen(false);
                  }
                  onClick?.();
                };

                return (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="sm"
                    className={className}
                    onClick={handleClick}
                  >
                    {text}
                  </Button>
                );
              })}
            </div>
          </Dropdown>
        </>
      )}
    </div>
  );
}

export interface TemplateCardCtaProps {
  mainText?: string;
  mainClassName?: string;
  mainOnClick?: () => void;
  additionals?: AdditionalCta[];
}

export interface AdditionalCta {
  text: string;
  className?: string;
  persistOnClick?: boolean;
  onClick?: () => void;
}
