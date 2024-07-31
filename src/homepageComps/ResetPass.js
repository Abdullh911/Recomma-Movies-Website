import { useRef, useState } from "react";
import NavBar from "../bars/navBar";
import { getQs } from "../recommaUtils/backendCalls";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
    let [qs,setQs]=useState("");
    let navigate=useNavigate();
    let emailRef=useRef();
    let ansRef=useRef();
    let [ans,setAns]=useState("");
    let [email,setEmail]=useState("");
    let [wrong,setWrong]=useState(false);
    let [worngAns,setWorngAns]=useState(false);
    async function getAnsQS(){
        let temp=emailRef.current.value;
        if(temp!=""){
            let qsObj=await getQs(temp);
            setEmail(temp);
            if(qsObj){
               setQs(qsObj.qs);
               setAns(qsObj.ans); 
               setWrong(false)
            }
            else{
                setWrong(true)
            }
        }
    }
    function check(){
        let temp=ansRef.current.value;
        if(temp!=""){
            if(ans==temp){
                setWorngAns(false);
                navigate(`/setNewPass/${email}`);
                
            }
            else{
                setWorngAns(true)
            }
        }
    }
    return ( 
        <div>
            <NavBar/>
            <div id="getEmail">
                <div id="loginTexts">
                    {wrong&&<p style={{color:'red'}}>This email doesn't exist</p>}
                    <h2>Email</h2>
                    <input ref={emailRef} type="text" placeholder="Enter Your Email"/>
                    {qs==""&&<button onClick={getAnsQS} id="loginBtn">Reset</button>}
                </div>
                {qs!=""&&<div id="loginTexts">
                    {worngAns&&<p style={{color:'red'}}>Wrong answer</p>}
                    <h1>{qs}</h1>
                    <input ref={ansRef} type="text" placeholder="Type Your Answer"/>
                    <button onClick={check} id="loginBtn">Reset</button>
                </div>}
            </div>
        </div>
     );
}
 
export default ResetPass;