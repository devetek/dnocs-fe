import LogoMariadb from '@/shared/assets/ico-mariadb.svg';
import LogoPostgresql from '@/shared/assets/ico-postgresql.svg';

export const ALLOW_FROM = [
  {
    label: 'Localhost',
    value: 'localhost',
  },
  {
    label: 'Public',
    value: 'public',
  },
];

export const ENGINE_LIST = [
  {
    label: (
      <span className="flex items-center gap-2">
        <img className="size-4" src={LogoMariadb} alt="MariaDB" />
        MariaDB
      </span>
    ),
    value: 'mysql',
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <img className="size-4" src={LogoPostgresql} alt="MariaDB" />
        PostgreSQL
      </span>
    ),
    value: 'postgresql',
  },
];
