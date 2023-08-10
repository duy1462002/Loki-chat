import React from 'react';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import { Input } from 'antd';
import UserItem from '~/components/UserItem';
import { SearchOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);
const SideBar = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-heading')}>
                <Input
                    prefix={<SearchOutlined/>}
                    placeholder="Tìm kiếm trên Loki chat..."
                    className={cx('input-search')}
                />
            </div>

            <div className={cx('users')}>
                <UserItem />
                
            </div>
        </div>
    );
};

export default SideBar;
