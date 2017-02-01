import currenciesList from '../tools/currency-list';

export default function CurrencySelector (props) {
  function onChange (name, evt) {
    let value = evt.target.options[evt.target.selectedIndex].value;

    if (typeof props.onChange === 'function') {
      props.onChange(name, value);
    }
  }

  function onSwap () {
    if (typeof props.onSwap === 'function') {
      props.onSwap('swap');
    }
  }

  return (
    <div className="row">
      <div className="col-md-4 pull-right text-right form-inline" style="padding: 10px 0">
        <div className="form-group">
          <label>Choose rates</label>
            <select ref="base" className="form-control" onChange={onChange.bind(this, 'base')}>
              { currenciesList.map((currency) => {
                return <option value={currency} selected={currency === props.base}>{currency}</option>;
              })}
            </select>
         </div>

         <button onClick={onSwap} className="btn btn-default" title="Swap currencies" style="padding: 6px 2px">&nbsp;/&nbsp;</button>
         <select ref="current" className="form-control" onChange={onChange.bind(this, 'symbol')}>
              { currenciesList.map((currency) => {
                return <option value={currency} selected={currency === props.symbol}>{currency}</option>;
              })}
         </select>
       </div>
     </div>
  );
};
