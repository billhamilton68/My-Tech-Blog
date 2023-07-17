module.exports = {
  format_date: (date) => {
    if (date && Object.prototype.toString.call(date) === '[object Date]') {
      
        return date.toLocaleDateString();
    } else {
        
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