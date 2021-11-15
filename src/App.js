import React  from 'react';
import LoginForm from './components/LoginForm.js';
import { BrowserRouter , Route,Switch } from 'react-router-dom';
import adminPage from './components/adminPage.js';

import { render } from '@testing-library/react';





function App(){
 // const [user,setUser] = useState('')
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          
           <Route path='/registration' component={LoginForm} />
           <Route path='/admin123' component={adminPage} /> 
          </Switch>
      </div>
    </BrowserRouter>
  )
  
 /*function App(){
   return (
   <Router>
     <Route path = "/registration" exact render = {(props) => <LoginForm/>} />
     <Route path = "/admin"  render = {(props) => <adminPage/>} />
   </Router>

   );
}*/


/*function App() {
  const adminUser = {
    email: "admin@gmail.com",
    password: "admin123"
  }

  const [user ,setUser] = useState({name:"" , email:""});
  const [error, setError] = useState("");

const Login = details =>{
  console.log(details);

  if  (details.email == adminUser.email && details.password == adminUser.password){
   console.log("Logged in");
   setUser({
     name: details.name,
     email: details.email
   });
} else {
  console.log("Details do not match");
  setError("Details do not match");
}
}

const Logout = () =>{
  setUser({name:"",email:""});
}
  return (
    <div className="App">
     {(user.email != "") ? (
       <div className = "welcome">
         <h2>welcome,<span>{user.name}</span></h2>
         <button onClick={Logout}>Logout</button>
         </div>
     ) : (
     <LoginForm Login={Login} error={error}/>
     )}
    </div>
  );
}*/








}
export default App;
