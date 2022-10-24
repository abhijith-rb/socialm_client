import React, { useContext } from 'react'
import { useState } from 'react';
import "./post.css";
import { MoreVert } from '@mui/icons-material';
import { useEffect } from 'react';
import axios from "axios"
import { format, render, cancel, register } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


export default function Post({post}) {
    const[like,setLike] = useState(post.likes.length);
    const[isLiked,setIsLiked] = useState(false);
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    },[post.likes, currentUser._id])
    
    useEffect(()=>{
        const fetchUser = async ()=>{
          const res =await axios.get(`/api/users?userId=${post.userId}`)
          setUser(res.data)
        }
        fetchUser();
      },[post.userId])
    const likeHandler = ()=>{
        try {
            axios.put("/api/posts/"+post._id+"/like", {userId:currentUser._id})
        } catch (err) {
            console.log(err)
        }
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF+"/person/"+user.profilePicture : `${PF}person/noAvatar.png` } 
                    alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>          {/*format(post.createdAt)*/}
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postcenter">
                <span className="postText">{post?.desc}</span>
                <img src={post.img && PF +post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className='likeIcon' src={PF+"like.png"} alt="" onClick={likeHandler}/>
                    <img className='likeIcon' src={PF+"heart.png"} alt="" onClick={likeHandler}/>
                    <span className="postLikeCounter">{like} people liked this post</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.Comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
