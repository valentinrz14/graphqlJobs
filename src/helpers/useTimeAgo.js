const DATE_UNITS = [
  ['year', 31557600],
  ['month', 2628000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
];
const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const date = new Date(timestamp);
  const elapsed = (date - now) / 1000;
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'minute') {
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp) {
  const { value, unit } = getDateDiffs(timestamp);
  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    style: 'long',
  });
  return rtf.format(value, unit);
}
