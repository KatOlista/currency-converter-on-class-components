import React from 'react'
import { connect } from 'react-redux'

import Loader from '../UI/Loader/Loader'
import RateList from '../RateList/RateList'

import styles from './Header.module.scss'

import Logo from '../../assets/icons/currency-exchange.svg?react'

class Header extends React.Component {
  render () {
    const { isLoading, hasError, rates } = this.props.rates;
    const showError = !isLoading && hasError;
    const showContent = !isLoading && !hasError && !!rates.length;

    return (
      <header className={styles.header}>
        <a href="./">
          <Logo className={styles.header__logo} />
        </a>

        {isLoading && (
          <div className={styles.header__loader}>
            <Loader />
          </div>
        )}

        {showError && <p>Something went wrong</p>}

        {showContent && <RateList rates={rates} />}
      </header>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.currentRates
})

export default connect(mapStateToProps)(Header)
