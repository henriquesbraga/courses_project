import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);


function getFormattedDate() {
  return dayjs().tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm:ssZ");
}


function formatDate(date: string) {
  return dayjs(date).tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm:ssZ");
}




export { getFormattedDate, formatDate };