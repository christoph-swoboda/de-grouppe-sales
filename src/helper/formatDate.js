export const formatDate = (date) => {
    const d = new Date(date);
    const curr_date = d.getDate().toString().padStart(2, "0");
    const curr_month = d.getMonth() + 1; //Months are zero based
    const curr_year = d.getFullYear();
    const hour = d.getHours().toString().padStart(2, "0");
    const minute = d.getMinutes().toString().padStart(2, "0");
    return curr_date + "." + curr_month + "." + curr_year +' '+ hour +':' +minute
}