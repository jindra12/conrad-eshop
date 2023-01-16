/**
 * Serializes todays date
 */
export const getSerializedTodayDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month <= 9 ? `0${month}` : month}-${day <= 9 ? `0${day}` : day}`;
};