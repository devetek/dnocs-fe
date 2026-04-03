import { Link } from '@tanstack/react-router';

import { useTheme } from '@/services/theme/model';

import LOGO_TERPUSAT_WHITE from '@/shared/assets/ico-terpusat-white.svg';
import LOGO_TERPUSAT from '@/shared/assets/ico-terpusat.svg';

interface BrandLogoProps {
  collapsed?: boolean;
}

export default function BrandLogo(props: BrandLogoProps) {
  const { collapsed } = props;

  const [theme] = useTheme();

  return (
    <div className="w-max">
      <Link
        className="px-3 data-[collapsed=true]:px-2.5 py-2 flex items-center gap-2 cursor-pointer transition-all rounded-lg hover:bg-primary/20"
        data-collapsed={collapsed}
        to="/"
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
          <p className="text-xl text-primary">
            d<span className="font-bold">nocs</span>
          </p>
        )}
      </Link>
    </div>
  );
}
