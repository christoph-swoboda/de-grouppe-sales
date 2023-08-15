export const formatDate = (date, withTime) => {
    const d = new Date(date);
    const curr_date = d.getDate().toString().padStart(2, "0");
    const curr_month = (d.getMonth()+1).toString().padStart(2, "0"); //Months are zero based
    const curr_year = d.getFullYear();
    const hour = d.getHours().toString().padStart(2, "0");
    const minute = d.getMinutes().toString().padStart(2, "0");
    if (withTime) {
        if (date) {
            return curr_date + "." + curr_month + "." + curr_year + ' ' + hour + ':' + minute
        } else {
            return '-'
        }
    } else {
        if (date) {
            return curr_date + "." + curr_month + "." + curr_year
        } else {
            return '-'
        }
    }
}