import React from 'react'

import RateItem from '../RateItem/RateItem'
import { DEFAULT_CURRENCIES } from '../../utils/'

import styles from './RateList.module.scss'

export default class RateList extends React.Component {
  render () {
    const filteredRates = this.props.rates.filter(
      ({ cc }) => cc === DEFAULT_CURRENCIES.usd || cc === DEFAULT_CURRENCIES.eur,
    );

    return (
      <ul className={styles.rates}>
        {filteredRates.map((rate) => (
          <RateItem key={rate.cc} rate={rate} />
        ))}
      </ul>
    )
  }
}
