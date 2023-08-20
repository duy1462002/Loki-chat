import { useState } from 'react';
import { Button, Input } from 'antd';
import { ArrowRightOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from './Register.module.scss';
import className from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '~/firebase';
import { doc, setDoc } from 'firebase/firestore';
const cx = className.bind(styles);

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister();
    };

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                await setDoc(doc(database, 'users', user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: userName,
                    isOnline: false,
                });

                await setDoc(doc(database, 'userChats', user.uid), {});
                
                alert('Tạo tài khoản thành công');
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-login')}>
                <h3 className={cx('heading')}>Đăng ký</h3>
                <form onSubmit={handleSubmit} className={cx('form')}>
                    <Input
                        className={cx('input')}
                        placeholder="Nhập tài khoản..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input.Password
                        className={cx('input')}
                        placeholder="Nhập mật khẩu..."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        iconRender={(visible) =>
                            visible ? (
                                <EyeTwoTone />
                            ) : (
                                <EyeInvisibleOutlined style={{ color: '#dddad6' }} />
                            )
                        }
                    />
                    <Input
                        className={cx('input')}
                        placeholder="Nhập tên người dùng..."
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <Button
                        className={cx('login-button')}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined />}
                        onClick={handleRegister}
                    />
                </form>
                <Link to="/login" className={cx('link-register')}>
                    Đã có sẵn tài khoản?
                </Link>
            </div>
        </div>
    );
};

export default Register;
