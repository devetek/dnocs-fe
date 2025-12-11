export function formatValueUsage(valueInMB: number) {
  if (valueInMB < 1024) {
    return valueInMB.toFixed(2) + ' MB';
  }

  return (valueInMB / 1024).toFixed(2) + ' GB';
}
