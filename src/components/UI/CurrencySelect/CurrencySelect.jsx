import React from 'react'
import { connect } from 'react-redux'

import styles from './CurrencySelect.module.scss'

class CurrencySelect extends React.Component {
  render() {
  const { value, onChange, rates } = this.props;

    return (
      <select value={value} onChange={onChange} className={styles.select}>
        {rates.map((rate) => (
          <option key={rate.cc} className={styles.select__option} value={rate.cc}>
            {rate.txt} {rate.cc}
          </option>
        ))}
      </select>
    );
  }
}

const mapStateToProps = state => ({
  rates: state.currentRates.rates
})

export default connect(mapStateToProps)(CurrencySelect)
