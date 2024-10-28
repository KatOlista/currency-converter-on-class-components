import React from 'react'

import { DEFAULT_CURRENCIES } from '../../utils/'

import styles from './RateItem.module.scss'

export default class RateItem extends React.Component {
  render () {
    return (
      <li className={styles.item}>
        <h2 className={styles.item__title}>{this.props.rate.cc}:</h2>
        <p>
          {this.props.rate.rate} {DEFAULT_CURRENCIES.uah}
        </p>
      </li>
    )
  }
}
