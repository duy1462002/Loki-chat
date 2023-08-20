import React, { useEffect, useState } from 'react';
import styles from './ChatBox.module.scss';
import classNames from 'classnames/bind';
import { FileImageFilled, SendOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import SentMessage from '../SentMessage';
import ReceivedMessage from '../ReceivedMessage';
import { Timestamp, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { database } from '~/firebase';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import DefaultAvt from '~/assets/defaultAvt.jpg';
import ImageContainer from '../ImageContainer';
import { Scrollbars } from 'react-custom-scrollbars-2';

const cx = classNames.bind(styles);
const ChatBox = () => {
    const currentUser = useSelector((state) => state.currentUser);
    const combinedId = useSelector((state) => state.combinedId);
    const [chatInfo, setChatInfo] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    console.log(currentUser.uid);
    console.log(combinedId);
    useEffect(() => {
        const getChatInfo = () => {
            const unsub = onSnapshot(doc(database, 'userChats', currentUser.uid), (doc) => {
                setChatInfo(doc.data());
            });
            const unsub2 = onSnapshot(doc(database, 'chats', combinedId), (doc) => {
                setChatHistory(doc.data());
            });
            return () => {
                unsub();
                unsub2();
            };
        };
        getChatInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [combinedId]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleSendMessage = async () => {
        if(message) {
            await updateDoc(doc(database, 'chats', combinedId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: message,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
            setMessage('');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                {chatInfo[`${combinedId}`]?.userInfo.photoURL ? (
                    <ImageContainer
                        alt=""
                        url={chatInfo[`${combinedId}`]?.userInfo.photoURL}
                        size="48px"
                    />
                ) : (
                    <ImageContainer url={DefaultAvt} size="40px" />
                )}

                <div className={cx('info')}>
                    <strong className={cx('name')}>
                        {chatInfo[`${combinedId}`]?.userInfo.displayName ||
                            chatInfo[`${combinedId}`]?.userInfo.email}
                    </strong>
                    <div className={cx('online-info')}>
                        <div className={cx('status')}></div>
                        <p>online</p>
                    </div>
                </div>
            </div>

            <div className={cx('messages')}>
                <Scrollbars style={{ width: '100%', height: 'calc(80vh - 54px - 46px)' }}>
                    {chatHistory?.messages?.map((message) => {
                        if (message.senderId === currentUser.uid) {
                            return (
                                <SentMessage
                                    data={message.text}
                                    key={message.id}
                                />
                            );
                        } else {
                            return (
                                <ReceivedMessage
                                    key={message.id}
                                    data={message.text}
                                    photoURL={chatInfo[`${combinedId}`]?.userInfo.photoURL}
                                />
                            );
                        }
                    })}
                </Scrollbars>
            </div>

            <div className={cx('chat-message')}>
                <form onSubmit={handleSubmit}>
                    <FileImageFilled className={cx('icon')} />
                    <Input
                        placeholder="Aa"
                        className={cx('input-message')}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button
                        htmlType="submit"
                        className={cx('send-button')}
                        type="primary"
                        size="small"
                        icon={<SendOutlined />}
                        onClick={handleSendMessage}
                    />
                </form>
            </div>
        </div>
    );
};

export default ChatBox;