import { UploadOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useState, memo } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styles from './UploadInfo.module.scss';
import classNames from 'classnames/bind';
import { auth, database, storage } from '~/firebase';
import { useDispatch } from 'react-redux';
import * as actions from '~/store/actions';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
const cx = classNames.bind(styles);

const UploadInfo = ({ onClick }) => {
    const dispatch = useDispatch();
    const [imageUpload, setImageUpload] = useState();
    const [displayName, setDisplayName] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        updateDisplayName();
        uploadAvatar();
        setIsModalOpen(false);
    };

    const uploadAvatar = () => {
        if (!imageUpload) return;

        const imageRef = ref(storage, `${auth.currentUser.email}/images/${imageUpload.name}`);

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                await updateDoc(doc(database, 'users', auth.currentUser.uid), {
                    photoURL: url,
                });
                const docSnap = await getDoc(doc(database, 'users', auth.currentUser.uid));
                if (docSnap.exists()) {
                    dispatch(actions.setCurrentUser(docSnap.data()));
                }
            });
        });
    };

    const updateDisplayName = async () => {
        if(!displayName) return;
        
        await updateDoc(doc(database, 'users', auth.currentUser.uid), {
            displayName: displayName,
        });
        const docSnap = await getDoc(doc(database, 'users', auth.currentUser.uid));
        if (docSnap.exists()) {
            dispatch(actions.setCurrentUser(docSnap.data()));
        }
    };

    return (
        <>
            <div
                className={cx('wrapper')}
                onClick={() => {
                    showModal();
                    onClick();
                }}
            >
                <UploadOutlined style={{ marginRight: 8 }} />
                Thay đổi thông tin
            </div>
            <Modal
                title="Thay đổi thông tin"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className={cx('name-changing')}>
                    <h3>Chọn tên hiển thị</h3>
                    <Input
                        placeholder="Nhập tên bạn muốn hiển thị..."
                        value={displayName}
                        onChange={(e) => {
                            setDisplayName(e.target.value);
                        }}
                    />
                </div>

                <div className={cx('avatar-upload')}>
                    <h3>Chọn ảnh đại diện</h3>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                            setImageUpload(e.target.files[0]);
                        }}
                    />
                </div>
            </Modal>
        </>
    );
};

export default memo(UploadInfo);
