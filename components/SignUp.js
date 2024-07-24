import styles from '../styles/SignIn.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function SignIn(props) {

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

    fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname: firstname, username: username, password: password }),
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.result) {
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
            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
        <h4 className={styles.modalTitle}>
            Create your Twitter account
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

export default SignIn;