import React from 'react';
import styles from './ChatBox.module.scss';
import classNames from 'classnames/bind';
import { FileImageFilled, SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const cx = classNames.bind(styles);
const ChatBox = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <img alt="" src="https://img-cache.coccoc.com/image2?i=2&l=20/255121630" />
                <div className={cx('info')}>
                    <strong className={cx('name')}>Nguyễn Thảo Linh</strong>
                    <div className={cx('online-info')}>
                        <div className={cx('status')}></div>
                        <p>online</p>
                    </div>
                </div>
            </div>

            <div className={cx('chat-message')}>
              <FileImageFilled className={cx('icon')}/>
              <Input placeholder='Aa' className={cx('input-message')}/>
              <SendOutlined className={cx('icon')}/>
            </div>

        </div>
    );
};

export default ChatBox;
