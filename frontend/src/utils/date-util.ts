import dayjs from 'dayjs';

export function formatToLocalDatetime(isoDate: string): string {
  return dayjs(isoDate).format('DD/MM/YYYY HH:mm:ss');
}