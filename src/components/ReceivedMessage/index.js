import React from 'react'
import classNames from 'classnames/bind'
import styles from './ReceivedMessage.module.scss'
const cx = classNames.bind(styles);

const ReceivedMessage = () => {
  return (
    <div className={cx('wrapper')}>
        <img alt='' src='https://yt3.googleusercontent.com/lRZ6IJmrnWpI4mvqmirmeKwqKmepeD7OZIk1C-csCF3fYRxkZXGFt7diVcKGXJPPBPTEH0vh=s900-c-k-c0x00ffffff-no-rj'/>
        <p>Hello bé</p>
    </div>
  )
}

export default ReceivedMessage