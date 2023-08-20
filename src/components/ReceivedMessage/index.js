import React from 'react'
import classNames from 'classnames/bind'
import styles from './ReceivedMessage.module.scss'
import ImageContainer from '../ImageContainer';
import DefaultAvt from '~/assets/defaultAvt.jpg';
const cx = classNames.bind(styles);

const ReceivedMessage = ({data, photoURL}) => {
  return (
    <div className={cx('wrapper')}>
        <>
                {photoURL ? (
                    <ImageContainer url={photoURL} size="30px" />
                ) : (
                    <ImageContainer url={DefaultAvt} size="30px" />
                )}
            </>
        <p>{data}</p>
    </div>
  )
}

export default ReceivedMessage