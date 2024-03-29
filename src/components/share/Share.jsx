import {  Cancel, EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material"
import "./share.css"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/Authcontext"
import axios from "axios"


export default function Share() {

    const {user}=useContext(AuthContext)
    const PF =process.env.REACT_APP_PUBLIC_FOlDER
    const desc=useRef()
    const [file,setFile]=useState(null)


    const submitHandler= async (e)=>{
        e.preventDefault()
        const newPost ={
            userId:user._id,
            desc:desc.current.value,
        }

        if (file) {
            const data =new FormData()
            const fileName= Date.now()+file.name
            data.append("name",fileName)
            data.append("file",file)
            newPost.img=fileName
            try {
                await axios.post("/upload",data)
                
                
            } catch (err) {
                console.log("aymene ")
                
            }

        }
        try {
           await  axios.post("/posts",newPost)
           window.location.reload()
            
        } catch (err) {
            console.log(file)
        }
    }


    return(
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    
                    <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture :PF+"profil/NoAvatar.jpg"} alt="" />
                    
                    <input ref={desc} placeholder={"what's in your mind safak "+user.username+" ?"} 
                    className="shareInput" />
                </div>
                <hr className="shareHr" />
                {
                    file && (
                        <div className="shareImgContainer">
                            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                            <Cancel className="shareCancelImg" onClick={()=>setFile(null)} />
                        </div>
                    )
                }
                <form className="shareButtom" onSubmit={submitHandler}>
                    <div className="shareoptions">
                        <label htmlFor="file" className="shareoption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or video </span>
                            <input style={{display:"none"}} type="file" name="" id="file" accept=".png,.jpeg,jpg"
                              onChange={(e) => setFile(e.target.files[0])}
                              />
                        </label>
                        <div className="shareoption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareoption">
                            < Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareoption">
                            < EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feelings </span>
                        </div>
                        <button className="shareButton" type="submit"> Share</button>
                    </div>
                   
                </form>
                <div>
                
                </div>
            </div>
        </div>
    )
    
}