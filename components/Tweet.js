import styles from '../styles/Tweet.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {removeTweet} from '../reducers/tweets';
import {login, logout} from '../reducers/user'
const moment = require('moment');

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
    'color' : 'white',
}

const isLiked = props.likedBy.some((e) => e === user.token)

let heartIcon = { 'cursor' : 'pointer' , 'color' : 'white'}
    if (isLiked === true) {
        heartIcon = { 'cursor' : 'pointer' , 'color' : '#e74c3c'}
    }

const counter = props.likedBy.length;


const formattedContent = props.content.split(" ").map((word, i) => {
    if(word.startsWith('#') && word.length > 1) {
        return (
            <span key={i} className={styles.hashtag} ><Link href={`/hashtag/${word.slice(1)}`}>{word}</Link> </span>
        )
    }
    return word + ' ';
})


    return (
        <>
        <div className={styles.tweetContainer}>
        <div className={styles.authorInfos}>
            <img className={styles.profilePic} src='profile-pic.png' alt="Profile picture" />
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
        
        </>
    );
}

export default Tweet;