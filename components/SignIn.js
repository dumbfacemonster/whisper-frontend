import styles from '../styles/SignIn.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';

function SignIn(props) {

const dispatch = useDispatch();
const router = useRouter();

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const [errorMessage, setErrorMessage] = useState('');

const handleClick = () => {
    fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.result) {
            dispatch(login(data.token));
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
        <h4 className={styles.modalTitle}>
            Connect to Twitter
        </h4>
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button className={styles.signInBtn} onClick={() => handleClick()}>Sign In</button>
        {errorMessage.length > 0 ? <div className={styles.error} >{errorMessage}</div> : ''}
        </div>
        ) : null}
        
        </>
    );
}

export default SignIn;