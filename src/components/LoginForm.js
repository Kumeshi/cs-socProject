import {React, useState,useEffect } from "react";
import "./LoginForm.css";
import emailjs from "emailjs-com";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

import { History } from "history";


//import FontAwesomeIcon from ' @fortawesome/react-fontawesome';
/*import {
    faFacebook,
    faTwitter,
    faGoogle,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';*/

const LoginForm = () => {
  const [name, setName] = useState("");
  const [user_email2, setEmail2] = useState('')
  const [user_email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [passw2, setPassw2] = useState("");
  const [passwConf, setPasswConf] = useState("");
  const [confirm, setConfirm] = useState(true);
  const [veriCode, setVeriCode] = useState("");
  const [code, setCode] = useState("code");
  const history = useHistory()
  const [addclass, setaddclass] = useState("");
  const [isAuth, setIsAuth] = useState(true)
  const [urlPage, setUrlPage] = useState('')
  const [checkPass, setCheckPass] = useState('')
  //const [id,serId] = useState('');
  const [admin,setadmin]=useState(false);
  //const express = require('express');
  //const app = express(); 

  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  
  useEffect(() => {
    axios.get('http://localhost:4000/user/check2/' + user_email).then((res) => {
      // eslint-disable-next-line
     // res.data.role==1?setadmin(true):setadmin(false)
     // console.log(res.data)
      setUrlPage(``)
      // eslint-disable-next-line
      //setId(res.data._id)
    })
    //window.alert(id)
  }, [user_email])

  useEffect(() => {
    axios
      .get('http://localhost:4000/user/check/' + user_email + '/' + passw)
      .then((res) => {
        setCheckPass(res.data)
        console.log(res.data)

        //window.alert(res.data)
      })
  }, [passw, user_email])

  const Submit = () => {
    //window.alert(checkPass)

    if (checkPass === 'done') {
      setIsAuth(false)
    } else {
      window.alert('email and password did not match')
    }
  }
  if (!isAuth) {
    return <Redirect to={urlPage} />
     //history.push('/admin')
  }
   //<Redirect to="http://localhost:3000/admin" />





  const verification = (a) => {
    if (!a) {
      return (
        <div className={`container ${addclass}`} id="container  "  >
          <div className="signin-signup" style={{ left: "25%" }}>
            <form onSubmit={sendEmail}>
              <h1>SIGN UP</h1>
              <p className="text-warning">
                your verification code was sent to {user_email}{" "}
              </p>
              <input
                type="text"
                value={veriCode}
                placeholder="VERIFICATION CODE"
                onChange={(e) => setVeriCode(e.target.value)}
              />
              <button type="submit">SIGN-UP</button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`container ${addclass}`} id="container">
          
          
            <div className=" form-container ">
            <div class="signin-signup">
              <form onSubmit={sendEmail} action="#" class="sign-up-container">
                <h1>SIGN UP</h1>
                <input
                  type="text"
                  value={name}
                  placeholder="NAME"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  value={user_email2}
                  placeholder="EMAIL"
                  onChange={(e) => setEmail2(e.target.value)}
                />
                <input
                  type="password"
                  value={passw2}
                  placeholder="PASSWORD"
                  onChange={(e) => setPassw2(e.target.value)}
                />
                <input
                  type="password"
                  value={passwConf}
                  placeholder=" CONFIRM YOUR PASSWORD"
                  onChange={(e) => setPasswConf(e.target.value)}
                />
                <button type="submit">SIGN-UP</button>
              </form>
              
            
            
              
              <form onSubmit={Submit} action="#" class="sign-in-container">
                <h1>SIGN IN</h1>
               <input type="text" placeholder="EMAIL" value={user_email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="PASSWORD"value={passw} onChange={(e)=>setPassw(e.target.value)}/>
                <button type="submit">LOGIN</button>
              </form>
              </div>
              </div>
              
             
          <div className="overlay-container">
            <div className="overlay-panel overlay-left">
              <button
                className="ghost"
                id="signUp"
                onClick={() => setaddclass("sign-up-mode")}
              >
                SIGN UP
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <button
                className="ghost"
                id="signIn"
                onClick={() => setaddclass("")}
              >
                SIGN IN
              </button>
            </div>
          </div>
          </div>
        
      );
    }
  };

  function sendEmail(e) {
    if (passw2 === passwConf) {
      if (confirm) {
        
        for (var i = 0; i < 8; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        setCode(result);
        const templateParams = {
          name: name,
          user_email: user_email2,
          result: result,
        };

        emailjs
          .send(
            "service_q50ajqd",
            "template_d46fo9d",
            templateParams,
            "user_rpmMj01N6O8rbHuez7ES7"
          )
          .then((res) => {
            console.log(res);

          })
          .catch((err) => console.log(err));
      }

      setConfirm(false)
     

      //window.alert(code)
      if (code === veriCode) {
        const obj = {
          name: name,
          email: user_email2,
          password: passw2,
          //admin_id: this.state.admin_id,
        }
        axios.post('http://localhost:4000/user/add', obj).then((res) => {
          window.alert(res.data)
        })
        setConfirm(true)
        //history.push('/signin')
        /*setConfirm(true)
        history.push('/login')*/
      } else {
        window.alert("please enter correct verification code");
        e.preventDefault();
      }
    } else {
      window.alert("confirm password did not match");
      e.preventDefault();
    }
  }

  return (
    <div>{verification(confirm)}</div>
    /*</form>return(
        <div className={`container ${addclass}`} id="container">
        <div class="signin-signup">
        <div className= "form-container sign-up-container">
            <form onSubmit={sendEmail}>
                <h1>SIGN UP</h1>
                <input type="text" name ="name" placeholder="NAME"onChange={(e) => setName(e.target.name)}/>
                <input type="email" name ="user_email" placeholder="EMAIL" onChange={(e) => setEmail(e.target.name)}/>
                <input type="password" name ="passw" placeholder="PASSWORD" onChange={(e) => setPassw(e.target.name)}/>
                <input type="password" name="passwConf" placeholder=" CONFIRM YOUR PASSWORD" onChange={(e) => setPasswConf(e.target.name)}/>
                <button type="submit">SIGN-UP</button>
            </form>
            </div>
            <div className=" form-container sign-in-container">
                <form>
                    <h1>SIGN IN</h1>
                    <input type="text" placeholder="NAME"/>
                    <input type="password" placeholder="PASSWORD"/>
                    <button type="submit">LOGIN</button>
                </form>
            </div>
            </div>
            <div className={`container ${addclass}`} id="container">
            <div className= "overlay-container">
                
                    <div className ="overlay-panel overlay-left">
                        <button className="ghost" id="signUp" onClick ={() =>setaddclass("sign-up-mode")}>SIGN UP</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                    <button className="ghost" id="signIn" onClick ={() =>setaddclass("")}>SIGN IN</button>
                </div>
             </div>
             {verification(confirm)}
            </div>*/
  );
};

export default LoginForm;
