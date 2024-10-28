import React from 'react';

import styles from './Loader.module.scss';

import LoaderIcon from '../../../assets/icons/circles-loader.svg?react';

export default class Loader extends React.Component{
  render() {
    return (
      <div className={styles.loader}>
        <LoaderIcon className={styles.loader__icon} />
      </div>
    );
  }
};
