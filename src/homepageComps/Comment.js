import { useEffect,useState } from "react";
import '../Comment.css'
const Comment = ({comment}) => {
    let [pic,setPic]=useState("");
    useEffect(()=>{
        let firstTwoLetters = comment.username.substring(0, 2);
        setPic(firstTwoLetters);
    },[])
    return ( 
        <div id="allComment">
            <div id="cmntData">
                <div id="pic">
                    {pic}
                </div>
                <h2>{comment.username}</h2>
                <p>{"("+comment.email+")"}</p>
            </div>
            <div id="commentBody">
                <h3>
                    {comment.content}
                </h3>
            </div>
        </div>
     );
}
 
export default Comment;