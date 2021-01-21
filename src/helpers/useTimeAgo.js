// Dependencies
import moment from 'moment';

export default function useTimeAgo(timestamp) {
  const rtf = moment(timestamp).fromNow();

  return rtf;
}
