import { create, Cream } from 'cakejs2';
import * as d3 from 'd3';

import CurrencySelector from './components/CurrencySelector';
import BarChart from './components/BarChart';
import MonthRange from './tools/month-range';
import FixerApi from './tools/fixer-api';

const LOCATION_DEFAULTS = window.location.href.replace(/#.*$/, '');

create({
  element: document.getElementById('application'),
  createRoot: false
})
.route('/', 'page.currencies')
.route('/:base/:symbol', 'page.currencies')
.route('*', 'page.currencies');

function openLocation (location) {
  window.history.pushState(null, null, LOCATION_DEFAULTS + '#/' + location);
}

Cream.extend({
  _namespace: 'page.currencies',
  isLoading: false,

  base: function (val) {
    return this.get('props.base') || 'EUR';
  }.property(),

  symbol: function (val) {
    return this.get('props.symbol') || 'RUB';
  }.property(),

  currencySwap () {
    this.set('isLoading', true);
    let location = this.get('symbol');
    location += '/';
    location += this.get('base');

    openLocation(location);
  },

  currencyChange (name, value) {
    this.set('isLoading', true);
    let location = name === 'base' ? value : this.get('base');
    location += '/';
    location += name === 'symbol' ? value : this.get('symbol');

    openLocation(location);
  },

  didTransition () {
    FixerApi(MonthRange(), this.get('base'), this.get('symbol'))
      .then((data) => {
        BarChart({ data: data, el: '#chart' });
        this.set('isLoading', false);
      });
  },

  render () {
    const base = this.get('base');
    const symbol = this.get('symbol');

    return (<div>
      { this.isLoading
       ? <h2 className="text-center">
          Loading...
        </h2>
       : <h2 className="text-center">
          {base}/{symbol} Exchange Rates from {d3.timeFormat('%b %m %Y')(new Date())}
        </h2>
      }
      <CurrencySelector onChange={this.currencyChange}
        onSwap={this.currencySwap} base={base} symbol={symbol} />
    </div>
    );
  }
});
