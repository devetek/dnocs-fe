const mapLabel = (arr: number[]) =>
  arr.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

export const OPTS_RAM_GB = mapLabel([2, 4, 6, 8, 10, 12, 14, 16]);

export const OPTS_DISK_GB = mapLabel([20, 40, 60, 80, 100, 120, 140, 160]);

export const OPTS_CPU_CORE = mapLabel([2, 4, 6, 8]);

export const LINK_DOCUMENTATION = 'https://cloud.terpusat.com/docs/id/intro';
export const LINK_MAILTO_PRAKASA = 'mailto: prakasa@devetek.com';
export const LINK_START_CHAT =
  '//wa.me/6282113468822/?text=Hello%2C%20I%27d%20like%20to%20inquire%20about%20dPanel%20VM%20Creation';
