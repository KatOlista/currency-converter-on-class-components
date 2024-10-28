import React from 'react'
import { connect } from 'react-redux'

import { convertCurrency, DEFAULT_CURRENCIES, getItem } from '../../utils'
import { setUpperInput } from '../../redux/features/upperInputSlice'
import { setLowerInput } from '../../redux/features/lowerInputSlice'
import Loader from '../UI/Loader/Loader'
import ConverterItem from '../ConverterItem/ConverterItem'

import styles from './CurrencyConverter.module.scss'

class CurrencyConverter extends React.Component {
  state = {
    selectedCurrency1: DEFAULT_CURRENCIES.usd,
    selectedCurrency2: DEFAULT_CURRENCIES.uah
  }

  render () {
    const {
      upperInputValue,
      lowerInputValue,
      dispatch
    } = this.props;

    const {
      isLoading,
      hasError,
      rates
    } = this.props.rates;

    const showError = !isLoading && hasError;
    const showContent = !isLoading && !hasError;

    const selectedUpperCurrency = getItem(rates, this.state.selectedCurrency1);
    const selectedLowerCurrency = getItem(rates, this.state.selectedCurrency2);

    const setInputValueOnUpperInputChange = (value) => {
      const calculatedValue = convertCurrency(
        value,
        selectedUpperCurrency.rate,
        this.state.selectedCurrency1,
        selectedLowerCurrency.rate,
        this.state.selectedCurrency2,
      );

      dispatch(setUpperInput(value));
      dispatch(setLowerInput(calculatedValue));
    };

    const setInputValueOnLowerInputChange = (value) => {
      const calculatedValue = convertCurrency(
        value,
        selectedLowerCurrency.rate,
        this.state.selectedCurrency2,
        selectedUpperCurrency.rate,
        this.state.selectedCurrency1,
      );

      dispatch(setLowerInput(value));
      dispatch(setUpperInput(calculatedValue));
    };

    const calculateInputOnUpperCurrencyChange = (selectedCurrency) => {
      const selectedUpperCurrency = getItem(rates, selectedCurrency);

      const calculatedValue = convertCurrency(
        upperInputValue,
        selectedUpperCurrency.rate,
        selectedCurrency,
        selectedLowerCurrency.rate,
        this.state.selectedCurrency2,
      );

      this.setState({ selectedCurrency1 : selectedCurrency })
      dispatch(setLowerInput(calculatedValue));
    };

    const calculateInputOnLowerCurrencyChange = (selectedCurrency) => {
      const selectedLowerCurrency = getItem(rates, selectedCurrency);

      const calculatedValue = convertCurrency(
        lowerInputValue,
        selectedLowerCurrency.rate,
        selectedCurrency,
        selectedUpperCurrency.rate,
        this.state.selectedCurrency1,
      );

      this.setState({ selectedCurrency2 : selectedCurrency })
      dispatch(setUpperInput(calculatedValue));
    };

    return (
      <main className={styles.converter}>
        {isLoading && (
          <div className={styles.converter__loader}>
            <Loader />
          </div>
        )}

        {showError && <p>Something went wrong</p>}

        {showContent && (
          <>
            <h1 className={styles.converter__header}>Currency Converter</h1>

            <form className={styles.converter__form}>
              <ConverterItem
                inputValue={upperInputValue}
                setInputValue={setInputValueOnUpperInputChange}
                setInputOnCurrencyChange={calculateInputOnUpperCurrencyChange}
                selectedCc={this.state.selectedCurrency1}
              />

              <ConverterItem
                inputValue={lowerInputValue}
                setInputValue={setInputValueOnLowerInputChange}
                setInputOnCurrencyChange={calculateInputOnLowerCurrencyChange}
                selectedCc={this.state.selectedCurrency2}
              />
            </form>
          </>
        )}
      </main>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.currentRates,
  upperInputValue: state.upperInputValue.upperInputValue,
  lowerInputValue: state.lowerInputValue.lowerInputValue,
})

const mapDispatchToProps = (dispatch, value) => ({
  setUpperInput: () => dispatch(setUpperInput(value)),
  setLowerInput: () => dispatch(setLowerInput(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter)
