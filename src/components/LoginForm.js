import React, { useState } from "react";
import "./LoginForm.css";
import emailjs from "emailjs-com";
//import FontAwesomeIcon from ' @fortawesome/react-fontawesome';
/*import {
    faFacebook,
    faTwitter,
    faGoogle,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';*/

const LoginForm = () => {
  const [name, setName] = useState("");
  const [user_email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [passwConf, setPasswConf] = useState("");
  const [confirm, setConfirm] = useState(true);
  const [veriCode, setVeriCode] = useState("");
  const [code, setCode] = useState("code");
  //const history = useHistory()
  const [addclass, setaddclass] = useState("");

  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  const verification = (a) => {
    if (!a) {
      return (
        <div className={`container ${addclass}`} id="container">
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
          <div class="signin-signup">
            <div className="form-container sign-up-container">
              <form onSubmit={sendEmail}>
                <h1>SIGN UP</h1>
                <input
                  type="text"
                  value={name}
                  placeholder="NAME"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  value={user_email}
                  placeholder="EMAIL"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  value={passw}
                  placeholder="PASSWORD"
                  onChange={(e) => setPassw(e.target.value)}
                />
                <input
                  type="password"
                  value={passwConf}
                  placeholder=" CONFIRM YOUR PASSWORD"
                  onChange={(e) => setPasswConf(e.target.value)}
                />
                <button type="submit">SIGN-UP</button>
              </form>
            </div>
            <div className=" form-container sign-in-container">
              <form>
                <h1>SIGN IN</h1>
                <input type="text" placeholder="NAME" />
                <input type="password" placeholder="PASSWORD" />
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
    if (passw === passwConf) {
      if (confirm) {
        
        for (var i = 0; i < 8; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        setCode(result);
        const templateParams = {
          name: name,
          user_email: user_email,
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
          email: user_email,
          password: passw,
          //admin_id: this.state.admin_id,
        };
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
