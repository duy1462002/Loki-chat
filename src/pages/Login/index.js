import React, { useState } from 'react';
import { Button, Input } from 'antd';
import {
    ArrowRightOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
} from '@ant-design/icons';
import styles from './Login.module.scss';
import className from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/firebase';
import {useDispatch} from 'react-redux'
import * as actions from '~/store/actions' 
const cx = className.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log(user);
                alert('Đăng nhập thành công!')
                dispatch(actions.setIsLogin(true));
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                alert('Sai email hoặc mật khẩu rồi bé ơi');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-login')}>
                <h3 className={cx('heading')}>Đăng nhập</h3>
                <form onSubmit={handleSubmit} className={cx('form')}>
                    <Input
                        className={cx('input')}
                        placeholder="Nhập tài khoản..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input.Password
                        className={cx('input')}
                        placeholder="Nhập mật khẩu..."
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        iconRender={(visible) =>
                            visible ? (
                                <EyeTwoTone />
                            ) : (
                                <EyeInvisibleOutlined style={{ color: '#dddad6' }} />
                            )
                        }
                    />
                    <Button
                        htmlType="submit"
                        className={cx('login-button')}
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined />}
                        onClick={handleLogin}
                    />
                </form>
                <Link to="/register" className={cx('link-register')}>
                    Tạo tài khoản
                </Link>
            </div>
        </div>
    );
};

export default Login;
