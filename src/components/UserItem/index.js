import { memo } from 'react';
import styles from './UserItem.module.scss';
import classNames from 'classnames/bind';
import DefaultAvt from '~/assets/defaultAvt.jpg';
import ImageContainer from '../ImageContainer';
const cx = classNames.bind(styles);

const UserItem = ({ data, onClick }) => {
    return (
        <div className={cx('wrapper')} onClick={() => onClick(data)}>
            <>
                {data.photoURL ? (
                    <ImageContainer url={data.photoURL} size='48px'/>
                ) : (
                    <ImageContainer url={DefaultAvt} size='48px'/>
                )}
            </>
            <div className={cx('info')}>
                <strong className={cx('name')}>{data.displayName ? data.displayName : data.email}</strong>
                <div className={cx('online-info')}>
                    <div className={cx('status')}></div>
                    <p>online</p>
                </div>
            </div>
        </div>
    );
};

export default memo(UserItem);
