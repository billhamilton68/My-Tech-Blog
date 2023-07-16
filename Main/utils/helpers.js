module.exports = {
  format_date: (date) => {
    if (date && Object.prototype.toString.call(date) === '[object Date]') {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    } else {
        // Return some default value or throw an error if date is not valid
        return 'Invalid date';
    }
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
  },

  eq: (arg1, arg2) => {
    return arg1 === arg2;
  },

  log: (value) => {
    console.log(value);
  },
};