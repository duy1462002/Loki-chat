import { useEffect, useState } from 'react';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import { Input } from 'antd';
import UserItem from '~/components/UserItem';
import { SearchOutlined } from '@ant-design/icons';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { auth, database } from '~/firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';

const cx = classNames.bind(styles);
const SideBar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const [allUsers, setAllUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(() => {
        setAllUsers([]);
        const getAllUser = async () => {
            const docsSnap = await getDocs(collection(database, 'users'));
            docsSnap.forEach((doc) => {
                if (doc.data().email !== auth.currentUser.email) {
                    setAllUsers((prev) => {
                        return [...prev, doc.data()];
                    });
                }
            });
        };
        getAllUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (searchInput) {
            const searchedUsersName = allUsers.filter((user) => {
                return user && user.displayName.includes(searchInput);
            });
            const searchedUsersEmail = allUsers.filter((user) => {
                return user && user.email.includes(searchInput);
            });
            if (searchedUsersName.length > 0) {
                setSearchedUsers(searchedUsersName);
            } else {
                setSearchedUsers(searchedUsersEmail);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    const handleSelected = async (user) => {
        const combinedId =
            auth.currentUser.uid > user.uid
                ? auth.currentUser.uid + user.uid
                : user.uid + auth.currentUser.uid;
        try {
            const res = await getDoc(doc(database, 'chats', combinedId));

            if (!res.exists()) {
                //tạo doc chat trong collection chats
                await setDoc(doc(database, 'chats', combinedId), {
                    messages: [],
                });
            }
            setSearchInput('');
            dispatch(actions.setCombinedId(combinedId));
            //tạo user chats
            await updateDoc(doc(database, 'userChats', auth.currentUser.uid), {
                [combinedId + '.userInfo']: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                [combinedId + '.date']: serverTimestamp(),
            });
            await updateDoc(doc(database, 'userChats', user.uid), {
                [combinedId + '.userInfo']: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
                [combinedId + '.date']: serverTimestamp(),
            });
            
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-heading')}>
                <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    prefix={<SearchOutlined />}
                    placeholder="Tìm kiếm trên Loki chat..."
                    className={cx('input-search')}
                />
            </div>

            <div className={cx('users')}>
                {searchInput
                    ? searchedUsers.map((user) => (
                          <UserItem
                              key={user.uid}
                              data={user}
                              onClick={() => handleSelected(user)}
                          />
                      ))
                    : allUsers.map((user) => (
                          <UserItem
                              key={user.uid}
                              data={user}
                              onClick={(user) => handleSelected(user)}
                          />
                      ))}
            </div>
        </div>
    );
};

export default SideBar;
