module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },


truncate: (str, len) => {
  if (str.length > len && typeof str === "string") {
      return str.substring(0, len) + "...";
  } else {
      return str;
  }
},
gt: (a, b) => {
  return a > b;
}
};
