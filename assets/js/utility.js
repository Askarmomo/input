import dayjs from "dayjs"; 

export function formetMyDate(date,format = "DD-MMM-YYYY h:mm A"){
    
    return dayjs(date).format(format);
}
