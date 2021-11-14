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
  const [edit,setedit]= useState(false)
  const [id,setid]=useState("")
  const[name,setname]=useState("")
  const[email,setemail]=useState("")

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
  const submit =(a)=>{
    const obj={
      name:name,
      email:email
    }
    axios
    .put('http://localhost:4000/user/update/'+a,obj )
    .then((res) => {
     window.alert(res.data)
    })
    .catch(function (err) {
      console.log(err)
    })

  }
   
const RowUsers = () => {
    return data.map(function(object, index){
      console.log(object);
      return <UserTable obj={object} key={index} id={(id)=>setid(id)} edit={(a)=>setedit(a)}/>
      
    })};
    
      
  return(
    <>
    {edit?
    <div className='py-5 px-4' style={{ background: 'rgba(0, 0, 0, 0.5)', position: "fixed", zIndex: 2000, width: '100%', height: '100vh', overflowY: 'scroll' }}>
    <div className="px-5 d-flex justify-content-end">
      <button type="button" className="btn btn-dark" style={{ border: '1px solid black', borderRadius: '10px' }} onClick={() => setedit(false)}>Close</button>
    </div>
    <div className="d-flex justify-content-center p-5" style={{ width: '60%', margin: 'auto', background: 'white', border: '3px solid black', borderRadius: '10px' }}>
    <div className ="update-container">
          <form onSubmit={()=>submit(id)}>
                
                <input type="text" placeholder="NAME" value={name} onChange={(e)=>setname(e.target.value)} />
                <input type="email" placeholder="EMAIL" value={email} onChange={(e)=>setemail(e.target.value)} />
                <button type="submit">UPDATE AND SAVE</button>
                </form>
        </div>
    </div>

  </div>
    :
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
         }
          </>
  )
}
 export default AdminPage