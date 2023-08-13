import React from 'react'
import classNames from 'classnames/bind'
import styles from './SentMessage.module.scss'
const cx = classNames.bind(styles);

const SentMessage = () => {
  return (
    <div className={cx('wrapper')}>
        <p>Hello tui la wxrdie</p>
        <img alt='' src='https://yt3.googleusercontent.com/lRZ6IJmrnWpI4mvqmirmeKwqKmepeD7OZIk1C-csCF3fYRxkZXGFt7diVcKGXJPPBPTEH0vh=s900-c-k-c0x00ffffff-no-rj'/>
    </div>
  )
}

export default SentMessage