import styles from '../styles/Tweet.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {getAllTweets, removeTweet, addTweet } from '../reducers/tweets';
import {login, logout} from '../reducers/user'
import Tweet from './Tweet';

function LastTweets() {

const dispatch = useDispatch();

useEffect(() => {
    fetch('http://localhost:3000/tweets')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        data.result === true ? dispatch(getAllTweets(data.tweets)) : console.log('Error getting tweets from DB');
    })
}, [])

const handleTrash = (tweetId) => {
    fetch(`http://localhost:3000/tweets/${tweetId}`, {
        method: 'DELETE',
    })
    .then(resp => resp.json())
    .then(data => {
        data.result === true ? dispatch(removeTweet(tweetId)) : console.log('Error removinf tweet')
    })
}

const tweets = useSelector((state) => state.tweets.value);
console.log(tweets)

const allTweets = tweets.map((data, i) => {

    return (
        <Tweet key={i} handleTrash={handleTrash} author={data.author.token} firstname={data.author.firstname} username={data.author.username} id={data._id} content={data.content} date={data.date} likedBy={data.likedBy} />
    )
})
//console.log(allTweets)


    return (
        <>
        <div className={styles.tweetsContainer}>
        {allTweets}
        </div>        
        </>
    );
}

export default LastTweets;