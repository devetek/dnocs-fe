import { useDevetekTranslations } from '@/services/i18n';
import { useTheme } from '@/services/theme/model';

import LOGO_TERPUSAT_WHITE from '@/shared/assets/ico-terpusat-white.svg';
import LOGO_TERPUSAT from '@/shared/assets/ico-terpusat.svg';

interface BrandLogoProps {
  collapsed?: boolean;
}

export default function BrandLogo(props: BrandLogoProps) {
  const { collapsed } = props;

  const [theme] = useTheme();

  const t = useDevetekTranslations();

  return (
    <div className="w-max">
      <a
        className="px-3 data-[collapsed=true]:px-2.5 py-2 flex items-center gap-2 cursor-pointer transition-all rounded-lg hover:bg-primary/20"
        data-collapsed={collapsed}
        href="/"
      >
        <div
          className="size-5 data-[collapsed=true]:size-7 transition-all"
          data-collapsed={collapsed}
        >
          <img
            src={theme === 'dark' ? LOGO_TERPUSAT_WHITE : LOGO_TERPUSAT}
            alt="Logo Terpusat"
          />
        </div>

        {!collapsed && (
          <p className="text-xl text-primary flex items-center">
            d<span className="font-bold">nocs</span>
            <span className="not-md:hidden">&nbsp;&nbsp;</span>
            <span className="not-md:hidden w-0.25 h-7 bg-primary/70" />
            <span className="not-md:hidden">&nbsp;&nbsp;</span>
            <span className="not-md:hidden pt-0.5 text-sm opacity-50">
              {t('page.landing.heading.slogan')}
            </span>
          </p>
        )}
      </a>
    </div>
  );
}
