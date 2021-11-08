import axios from "axios";

const UserTable = (props)=>{
    const userName= props.obj.name;
    const userEmail=props.obj.email;
    const id= props.obj._id;
    
    const deleteUser  = (id) => {
      axios.delete('http://localhost:4000/user/delete/'+id).then((res)=>{
          window.alert(res.data)
      })
      
    }
    const editUser  = () => {
        
    }
    return(
        <tr>
          <td className='text-dark'>{userName}</td>
          <td className='text-dark'>{userEmail}</td>
          <td className='text-dark'>{id}</td>
          <td className='text-dark'><div className= 'btn-lg btn-success'>Edit</div></td>
          <td className='text-dark'><div className= 'btn-lg btn-danger'onClick={()=>deleteUser( props.obj._id)}>Delete</div></td>
        </tr>
    )
}
export default UserTable;