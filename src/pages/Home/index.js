import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import SideBar from '~/components/SideBar';
import ChatBox from '~/components/ChatBox';
const cx = classNames.bind(styles);

const Home = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('chat-box-wrapper')}>
              <SideBar/>
              <ChatBox/>
            </div>
        </div>
    );
};

export default Home;
