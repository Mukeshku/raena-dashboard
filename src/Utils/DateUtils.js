export const getDifferenceInDays = (date1, date2) => {
    if (date1 === undefined || date2 === undefined){
        return -1
    }
    const diffInMs = Math.floor(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
}
