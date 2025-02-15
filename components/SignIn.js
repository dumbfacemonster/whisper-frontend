import styles from '../styles/SignIn.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faGhost } from '@fortawesome/free-solid-svg-icons';

function SignIn(props) {

const dispatch = useDispatch();
const router = useRouter();

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const [errorMessage, setErrorMessage] = useState('');

const handleClick = () => {
    fetch('https://whisper-backend-two.vercel.app/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.result) {
            dispatch(login(data.user));
            setUsername('');
            setPassword('');
            router.push('/home');
        }
        else {
            setErrorMessage('Incorrect user or password.')
        }
    })
}

    return (
        <>
        { props.isOpen ? (
        <div className={styles.modal}>
            <div className={styles.modalBox}>
        <FontAwesomeIcon type="button" onClick={props.onClose} icon={faXmark} className={styles.closeIcon} />
        <FontAwesomeIcon icon={faGhost} className={styles.icon} />
        <h4 className={styles.modalTitle}>
            Connect to Whisper
        </h4>
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button className={styles.signInBtn} onClick={() => handleClick()} >Sign in</button>
        {errorMessage.length > 0 ? <div className={styles.error} >{errorMessage}</div> : ''}
            </div>
        </div>
        ) : null}
        
        </>
    );
}

export default SignIn;