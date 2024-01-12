import ky from "ky";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)

const initTimeAgo = new TimeAgo("en")
const url = 'http://localhost:4100/api';

export const requestV1 = ky.create({
  prefixUrl: `${url}/v1`,
  mode: "cors",

});

export const timeAgo = (date: Date) => initTimeAgo.format(new Date(date), 'twitter')
