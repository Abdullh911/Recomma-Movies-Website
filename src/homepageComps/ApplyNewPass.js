import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../bars/navBar";
import { useEffect, useRef, useState } from "react";
import { getUser,updateUser } from "../recommaUtils/backendCalls";
const ApplyPass = () => {
    let {email}=useParams();
    let newRef=useRef();
    let newRef2=useRef();
    let navigate=useNavigate();
    async function changePass(){
        let temp=newRef.current.value;
        let temp2=newRef2.current.value;
        if(temp!="" && temp2==temp){
            let us=await getUser(email);
            us.password=temp;
            await updateUser(email,us);
            const serializedUser = JSON.stringify(us);
            localStorage.setItem('user', serializedUser);
            navigate('/login');
        }
    }
    return ( 
        <div id="loginContainer">
            <NavBar/>
            <div id="loginSpace">
                <div id="loginTexts">
                    <h2>Set Your New Password</h2>
                    <input ref={newRef} style={{marginBottom:'10px'}} placeholder="New Password" type="text" />
                    <input ref={newRef2} placeholder="Retype Your New Password" type="text" />
                    <button onClick={changePass} id="loginBtn">Apply</button>
                </div>
            </div>
        </div>
     );
}
 
export default ApplyPass;