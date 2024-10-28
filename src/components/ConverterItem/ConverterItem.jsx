import React from 'react'

import CurrencySelect from '../UI/CurrencySelect/CurrencySelect'
import CurrencyInput from '../UI/CurrencyInput/CurrencyInput'
import { validateInput } from '../../utils'

import styles from './ConverterItem.module.scss'

export default class ConverterItem extends React.Component {
  render () {
    const changeInputValueHandler = (e) => {
      this.props.setInputValue(validateInput(e.target.value));
    };

    const changeSelectHandler = (e) => {
      this.props.setInputOnCurrencyChange(e.target.value);
    };

    return (
      <div className={styles.item}>
        <CurrencySelect value={this.props.selectedCc} onChange={changeSelectHandler} />

        <CurrencyInput value={this.props.inputValue} onChange={changeInputValueHandler} />
      </div>
    )
  }
}
