import { useEffect, useRef, useState } from "react";
import NavBar from "../bars/navBar";
import { useNavigate } from 'react-router-dom';
import { loginEmail,loginUsername } from "../recommaUtils/backendCalls";
const Login = () => {
    let navigate=useNavigate();
    let usernameRef=useRef("");
    let password=useRef("");
    let [wrong,setWorng]=useState(false);
    useEffect(()=>{
        let temp = localStorage.getItem('user');
        temp = JSON.parse(temp);
        if(temp){
            navigate('/')
        }
    },[])
    async function loginHandle(){
        let us=usernameRef.current.value;
        let ps=password.current.value;
        const user = await loginUsername(us, ps);
        const user2=await loginEmail(us, ps);
        if (user || user2) {
            setWorng(false)
            if(user){
                const serializedUser = JSON.stringify(user);
                localStorage.setItem('user', serializedUser);
                //console.log(serializedUser);
                navigate('/');
            }
            else{
                const serializedUser = JSON.stringify(user2);
                localStorage.setItem('user', serializedUser);
                //console.log(serializedUser);
                navigate('/');
            }
        } else {
            setWorng(true)
            console.log("Login failed");
        }
    }
    function signupRedirect(){
        navigate('/signup');
    }
    function changePassRedirect(){
        navigate('/newPass');
    }
    return ( 
    <div id="loginContainer">
        <NavBar show={false}/>
        <div id="loginSpace">
            {wrong&&<p style={{color:'red',textAlign:'center',margin:0,padding:0}} >Wrong Username or Password</p>}
            <div id="loginTexts">
                <h1>Log In</h1>
                <input placeholder="Email or Username" ref={usernameRef} type="text" />
                <br />
                <input placeholder="Password" ref={password} type="password" />
                <p onClick={changePassRedirect} className="redirects" style={{textAlign:'right',marginTop:0}}>Forgot Password?</p>
                <button onClick={loginHandle} id="loginBtn">Login</button>
                <p onClick={signupRedirect} className="redirects" style={{textAlign:'center',marginTop:0,fontSize:'smaller'}}>new to Recomma? Sign up now</p>
            </div>
        </div>
    </div> 
    );
}
 
export default Login;