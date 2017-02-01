var d3 = require('d3');

module.exports = function MonthRange (now) {
  now = now || new Date();

  /* 00:00:00 - simple minus one day */

  var start = d3.timeDay.offset(d3.timeDay.offset(now, 1), -20);
  var format = d3.timeFormat('%Y-%m-%d');

  return d3.timeDay.range(start, d3.timeDay.offset(now, 1)).map(function (t) {
    return format(t);
  });
};
