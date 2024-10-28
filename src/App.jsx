import React from 'react'
import { connect } from 'react-redux'

import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter'
import { getFilteredRates, getRates } from './utils'
import {
  setRates,
  setRatesLoading,
  setRatesError,
} from './redux/features/ratesSlice'

class App extends React.Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(setRatesLoading(true));

    getRates()
      .then((ratesFromServer) => {
        const rates = getFilteredRates(ratesFromServer);
        dispatch(setRates(rates));
      })
      .catch(() => {
        dispatch(setRatesError(true));
      })
      .finally(() => {
        dispatch(setRatesLoading(false));
      });
  }

  render() {
    return (
      <div className="container">
      <Header />

      <CurrencyConverter dispatch={this.props.dispatch} />

      <Footer />
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch, value) => ({
  setRatesLoading: () => dispatch(setRatesLoading(value)),
  setRates: () => dispatch(setRates(value)),
  setRatesError: () => dispatch(setRatesError(value)),
})

export default connect(mapDispatchToProps)(App)
