var URL_BASE = 'https://api.fixer.io/'; // 2017-01-31?base=RON&symbols=RUB';

module.exports = function (range, base, symbol) {
  function toURL (date) {
    return URL_BASE + date + '?base=' + base + '&symbols=' + symbol;
  }

  return Promise.all(
    range.map(function (date) {
      return window.fetch(toURL(date))
        .then(function (response) { return response.json(); });
    })
  );
};
