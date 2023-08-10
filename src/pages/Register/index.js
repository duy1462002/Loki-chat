import React from 'react';
import { Button, Input } from 'antd';
import {
    ArrowRightOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
} from '@ant-design/icons';
import styles from './Register.module.scss';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = className.bind(styles);

const Register = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-login')}>
                <h3 className={cx('heading')}>Đăng ký</h3>
                <Input
                    className={cx('input')}
                    placeholder="Nhập tài khoản..."
                />
                <Input.Password
                    className={cx('input')}
                    placeholder="Nhập mật khẩu..."
                    type="password"
                    iconRender={(visible) =>
                        visible ? (
                            <EyeTwoTone />
                        ) : (
                            <EyeInvisibleOutlined style={{ color: '#dddad6' }} />
                        )
                    }
                />
                <Input.Password
                    className={cx('input')}
                    placeholder="Xác nhận mật khẩu..."
                    type="password"
                    iconRender={(visible) =>
                        visible ? (
                            <EyeTwoTone />
                        ) : (
                            <EyeInvisibleOutlined style={{ color: '#dddad6' }} />
                        )
                    }
                />
                <Button
                    className={cx('login-button')}
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                />
                <Link to="/login" className={cx('link-register')}>
                    Đã có sẵn tài khoản?
                </Link>
            </div>
        </div>
    );
};

export default Register;
