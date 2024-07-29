import styles from '../styles/Tweet.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {removeTweet} from '../reducers/tweets';
import {login, logout} from '../reducers/user'
const moment = require('moment');
import Image from 'next/image';

function Tweet(props) {

   //console.log(props)

const user = useSelector((state) => state.user.value);


const handleTrash = () => {
    props.handleTrash(props.id)
}

const updateLikes = () => {
    props.updateLikes(props.id)
    //console.log(props.id)
}

const time = moment(props.date).fromNow();

const trashIcon = {
    'cursor' : 'pointer',
    'color' : '#C1A49A',
}

const isLiked = props.likedBy.some((e) => e === user.token)

let heartIcon = { 'cursor' : 'pointer' , 'color' : '#C1A49A'}
    if (isLiked === true) {
        heartIcon = { 'cursor' : 'pointer' , 'color' : '#53131E'}
    }

const counter = props.likedBy.length;


const formattedContent = props.content.split(" ").map((word, i) => {
    if(word.startsWith('#') && word.length > 1) {
        return (
            <span key={i} ><Link className={styles.hashtag} href={`/hashtag/${word.slice(1)}`}><span className={styles.linkText}>{word}</span></Link> </span>
        )
    }
    return word + ' ';
})


    return (
        <>
        <div className={styles.tweetContainer}>
            <div className={styles.tweetBack}>
        <div className={styles.authorInfos}>
        <Image src="/profile-pic.png" alt="Avatar" width={60} height={60} className={styles.profilePic} />
            <p>
            <span className={styles.authorName}>{props.firstname} </span>
            <span className={styles.username}>@{props.username} </span>
            <span className={styles.point} >• </span>
            <span className={styles.date}>{time}</span>
            </p>
        </div>
        <div className={styles.content}>{formattedContent}</div>
        <div className={styles.icons}>
           <span className={styles.likes} ><FontAwesomeIcon onClick={() => updateLikes()} style={heartIcon} icon={faHeart} /> {counter} </span>
            {props.author === user.token ? (
            <FontAwesomeIcon style={trashIcon} onClick ={() => handleTrash()} icon={faTrashCan} /> 
            ) : null }
            </div>
        </div>
        </div>
        </>
    );
}

export default Tweet;