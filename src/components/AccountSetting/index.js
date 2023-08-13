import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AccountSetting.module.scss';
import { Popover } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';
import {useDispatch} from 'react-redux'
import * as actions from '~/store/actions' 
const cx = classNames.bind(styles);
const AccountSetting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(actions.setIsLogin(false));

            navigate('/login')
          }).catch((error) => {
            // An error happened.
            console.log(error);
          });
    }

    return (
        <div className={cx('wrapper')}>
            <Popover
                content={
                    <div className={cx('logout-item')} onClick={handleLogout}>
                        <LogoutOutlined style={{marginRight: 8}}/>
                        Đăng xuất
                    </div>
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                color="#151818"
                style={{boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)'}}
                placement='bottom'
                overlayInnerStyle={{padding: 6}}
            >
                <div className={cx('avatar')} />
            </Popover>
        </div>
    );
};

export default AccountSetting;
