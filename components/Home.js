import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function Home() {

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);


  const handleLogout = () => {
    dispatch(logout());
    router.push('/')
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.leftContainer}>
        <Link href='/'>
        <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
        </Link>
        <div className={styles.userSection}>
          <img src='profile-pic.png' alt="Photo de profil" className={styles.profilePic} />
          <div className={styles.userInfo}>
            <p className={styles.firstname}>
              {user.firstname}
            </p>
            <p className={styles.username}>
              @{user.username}
            </p>
          </div>
        </div>
        <button onClick={() => handleLogout()} className={styles.logout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
