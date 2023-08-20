import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import SideBar from '~/components/SideBar';
import ChatBox from '~/components/ChatBox';
import AccountSetting from '~/components/AccountSetting';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Home = () => {
    const navigate = useNavigate();
    const isLogin  = useSelector((state) => state.isLogin);

    return (
        <div>
            {isLogin ? (
                <div className={cx('wrapper')}>
                    <div className={cx('chat-box-wrapper')}>
                        <AccountSetting />
                        <SideBar />
                        <ChatBox />
                    </div>
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('login-container')}>
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={() => navigate('/login')}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
