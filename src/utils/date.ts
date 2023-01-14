export const getSerializedTodayDate = () => {
    const today = new Date();
    return [today.getFullYear(), today.getMonth() + 1, today.getDate()].join(
        "-"
    );
};