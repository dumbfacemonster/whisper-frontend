import styles from '../styles/SignUp.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faGhost } from '@fortawesome/free-solid-svg-icons';

function SignUp(props) {

const dispatch = useDispatch();
const router = useRouter();

const [firstname, setFirstname] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const [errorMessage, setErrorMessage] = useState('');

const handleClick = () => {
    if (firstname.length === 0 || username.length === 0 || password.length === 0) {
        setErrorMessage('Please complete all fields');
        return;
    };

    fetch('https://whisper-backend-two.vercel.app/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname: firstname, username: username, password: password }),
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        if (data.result) {
            //console.log(data.user)
            dispatch(login(data.user));
            setFirstname('');
            setUsername('');
            setPassword('');
            router.push('/home');
        }
        else {
            setErrorMessage('This username is not available')
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
            Create your Whisper account
        </h4>
        <input type="text" placeholder='Firstname' onChange={(e) => setFirstname(e.target.value)} value={firstname} />
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button className={styles.signUpBtn} onClick={() => handleClick()}>Sign Up</button>
        {errorMessage.length > 0 ? <div className={styles.error} >{errorMessage}</div> : ''}
        </div>
        </div>
        ) : null}
        
        </>
    );
}

export default SignUp;