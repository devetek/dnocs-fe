import AwsIco from '@/shared/assets/ico-aws.svg';
import DOIco from '@/shared/assets/ico-do.svg';
import GcpIco from '@/shared/assets/ico-gcloud.png';
import HetznerIco from '@/shared/assets/ico-hetzner.svg';
import IDCloudHostIco from '@/shared/assets/ico-idcloudhost.svg';
import ServerIco from '@/shared/assets/ico-server.webp';
import VultrIco from '@/shared/assets/ico-vultr.svg';

export const LINK_DOCUMENTATION = 'https://cloud.terpusat.com/docs/id/intro';
export const LINK_MAILTO_PRAKASA = 'mailto: prakasa@devetek.com';
export const LINK_START_CHAT =
  '//wa.me/6282113468822/?text=Hello%2C%20I%27d%20like%20to%20inquire%20about%20dPanel%20VM%20Creation';

export const CLOUD_PROVIDERS = [
  {
    icon: DOIco,
    label: 'Digital Ocean',
    value: 'do',
  },
  {
    icon: AwsIco,
    label: 'Amazon Web Services',
    value: 'aws',
  },
  {
    icon: GcpIco,
    label: 'Google Cloud Platform',
    value: 'gcp',
  },
  {
    icon: HetznerIco,
    label: 'Hetzner',
    value: 'hetzner',
  },
  {
    icon: VultrIco,
    label: 'Vultr',
    value: 'vultr',
  },
  {
    icon: IDCloudHostIco,
    label: 'IDCloudHost',
    value: 'idcloudhost',
  },
  {
    icon: ServerIco,
    label: 'Other',
    value: 'other',
  },
];
