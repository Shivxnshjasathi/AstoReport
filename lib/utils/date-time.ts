import { DateTime } from 'luxon';

export const createBirthDate = (
  date: string,
  time: string,
  timezone: string
): Date => {
  // date: YYYY-MM-DD
  // time: HH:mm (24h format from input)
  const dt = DateTime.fromISO(`${date}T${time}`, { zone: timezone });
  return dt.toJSDate();
};

export const formatDegrees = (decimal: number): string => {
  const degrees = Math.floor(decimal);
  const minutes = Math.floor((decimal - degrees) * 60);
  const seconds = Math.floor(((decimal - degrees) * 60 - minutes) * 60);
  return `${degrees}° ${minutes}' ${seconds}"`;
};
