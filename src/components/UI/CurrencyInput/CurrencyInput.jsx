import React from 'react'

import styles from './CurrencyInput.module.scss'

export default class CurrencyInput extends React.Component {
  render () {
    return (
      <input
        className={styles.input}
        type="text"
        placeholder="0"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    )
  }
};
