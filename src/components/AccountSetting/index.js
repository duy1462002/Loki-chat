import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AccountSetting.module.scss';
import { Popover } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import UploadInfo from '../UploadInfo';
import DefaultAvt from '~/assets/defaultAvt.jpg';
import ImageContainer from '../ImageContainer';
const cx = classNames.bind(styles);
const AccountSetting = () => {
    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const handleClosePopover = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                dispatch(actions.setIsLogin(false));
                navigate('/login');
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <Popover
                content={
                    <>
                        <UploadInfo onClick={handleClosePopover} />
                        <div className={cx('logout-item')} onClick={handleLogout}>
                            <LogoutOutlined style={{ marginRight: 8 }} />
                            Đăng xuất
                        </div>
                    </>
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                color="#151818"
                style={{
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
                }}
                placement="bottom"
                overlayInnerStyle={{ padding: 6 }}
            >
                {currentUser.photoURL ? (
                    <ImageContainer url={currentUser.photoURL} size='40px'/>
                ) : (
                    <ImageContainer url={DefaultAvt} size='40px'/>
                )}
            </Popover>
        </div>
    );
};

export default AccountSetting;
