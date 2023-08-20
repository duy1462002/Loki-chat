import React from 'react';
import classNames from 'classnames/bind';
import styles from './SentMessage.module.scss';

const cx = classNames.bind(styles);

const SentMessage = ({ data }) => {
    return (
        <div className={cx('wrapper')}>
            <p>{data}</p>
        </div>
    );
};

export default SentMessage;
