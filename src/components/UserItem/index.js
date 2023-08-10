import React from 'react'
import styles from './UserItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const UserItem = () => {
  return (
    <div className={cx('wrapper')}>
      <img alt='' src='https://img-cache.coccoc.com/image2?i=2&l=20/255121630'/>
      <div className={cx('info')}>
        <strong className={cx('name')}>Nguyễn Thảo Linh</strong>
        <div className={cx('online-info')}>
          <div className={cx('status')}></div>
          <p>online</p>
        </div>
      </div>
    </div>
    
  )
}

export default UserItem