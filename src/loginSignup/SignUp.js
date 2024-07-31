import { useRef,useState ,useEffect} from "react";
import NavBar from "../bars/navBar";
import { addUser } from "../recommaUtils/backendCalls";
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    let navigate = useNavigate();
    let emailRef=useRef("");
    let passwordRef=useRef("");
    let usernameRef=useRef("");
    let selectRef=useRef("");
    let answerRef=useRef("");
    let [wrong,setWorng]=useState(false);
    let [usernameEmpty,setUsernameEmpty]=useState(false);
    let [passwordEmpty,setPasswordEmpty]=useState(false);
    let [emailEmpty,setEmailEmpty]=useState(false);
    let [answerEmpty,setAnswerEmpty]=useState(false);
    useEffect(()=>{
        let temp = localStorage.getItem('user');
        temp = JSON.parse(temp);
        if(temp){
            navigate('/')
        }
    },[])
    async function handleSignup(){
        if(emailRef.current.value==""||passwordRef.current.value==""||answerRef.current.value==""||usernameRef.current.value==""){
            if(emailRef.current.value==""){
            setEmailEmpty(true);
            }
            if(passwordRef.current.value==""){
                setPasswordEmpty(true);
            }
            if(answerRef.current.value==""){
                setAnswerEmpty(true);
            }
            if(usernameRef.current.value==""){
                setUsernameEmpty(true);
            }
            return;
        }
        
        let user={
            username:usernameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            securtiyQs:selectRef.current.value,
            answer:answerRef.current.value,
            watchlist:[],
            favourites:[],
            watched:[],
            chats:[]
        }
        let response=await addUser(user);
        if(response!=null){
            //console.log(response);
            //console.log(user);
            const serializedUser = JSON.stringify(response);
            localStorage.setItem('user', serializedUser);
            navigate('/');
        }
        else{
            setWorng(true);
        }
    }
    function loginRedirect(){
        navigate("/login")
    }

    return ( 
    <div id="loginContainer">
        <NavBar show={false}/>
        <div id="loginSpace">
            {wrong&&<p style={{color:'red',textAlign:'center',margin:0,padding:0}} >Email or Username already in use</p>}
            <div id="loginTexts">
                <h2>Sign Up</h2>
                <legend>Email</legend>
                <input style={{borderColor:emailEmpty?'red':''}} ref={emailRef} type="text" />
                <legend>Username</legend>
                <input style={{borderColor:usernameEmpty?'red':''}} ref={usernameRef} type="text" />
                <legend>Security Question</legend>
                <select ref={selectRef}>
                    <option value="What is your first pet name?">What is your first pet name?</option>
                    <option value="What is the name of your first school?">What is the name of your first school?</option>
                    <option value="What is the name of your favourite movie?">What is the name of your favourite movie?</option>
                </select>
                <legend>Answer</legend>
                <input style={{borderColor:answerEmpty?'red':''}} ref={answerRef} type="text" name="" id="" />
                <legend>Password</legend>
                <input style={{borderColor:passwordEmpty?'red':''}} ref={passwordRef} type="password" />
                <br />
                <button onClick={handleSignup} id="loginBtn">Sign Up</button>
                <p onClick={loginRedirect} className="redirects" style={{textAlign:'center',marginTop:0,fontSize:'smaller'}}>Already Recomma user? Log In</p>

            </div>
        </div>
    </div> 
     );
}
 
export default SignUp;