// Daniel Aviv 209228154
// Yarin Naftali 208678565
export const getFormattedYearMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return `${year}-${month < 10 ? '0' : ''}${month}`;
};
