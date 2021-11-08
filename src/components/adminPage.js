import { useEffect, useState } from 'react'
import axios from 'axios'
import UserTable from './userTable'

/*<div className='col-xl-6 col-lg-12 border border-dark'>

          <table className='table table-striped mt-5'>
            <thead>
              <tr>
              <td className='text-dark'>{Id}</td>
              <td className='text-dark'>{UserName}</td>
              <td className='text-dark'>{UserEmail}</td>
              <td className='text-dark'>{Status}</td>
              <td className='text-dark'>{Action}</td>
              </tr>
</thead>*/
const AdminPage =()=>{
  const [data, setdata] = useState([])

 


  useEffect(() => {
    axios
      .get('http://localhost:4000/user/userdetails' )
      .then((res) => {
        setdata(res.data)
        console.log(res.data)
      })
      .catch(function (err) {
        console.log(err)
      })

  },[])
const RowUsers = () => {
    return data.map(function(object, index){
      console.log(object);
      return <UserTable obj={object} key={index}/>
      
    })};
    

  /* return (
    <div>
          <p>Details</p>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {RowUsers}
              
                <tr>
                  <th scope ="row">{index+1}</th>
                  <td>{object.name}</td>
                  <td>{object.email}</td>
                  <td>
                    <a classname ="btn btn-warning" href="#">
                      <i classname="fas fa-edit"></i>&nbsp;Edit
                      </a>
                      <a classname ="btn btn-danger" href="#">
                      <i classname="fas fa-trash-alt"></i>&nbsp;Delete
                      </a>
                  </td>
                  
                  
                </tr>
           </tbody>
          </table>
      </div>
    )
              
  }*/
  


  //return <>{row()}</>
 /* function adminPage(){
    return <div>hello</div>
  }*/
  return(
    <table className='table table-striped mt-5'>
            <thead>
               <tr>
                <th className='text-dark'>Name</th>
                <th className='text-dark'>Email</th>
                <th className='text-dark'>Id</th>
              </tr>
            </thead>
            <tbody>{RowUsers()}</tbody>
          </table>
  )
}
 export default AdminPage