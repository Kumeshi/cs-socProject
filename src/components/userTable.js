import axios from "axios";

const UserTable = (props)=>{
    const userName= props.obj.name;
    const userEmail=props.obj.email;
    const id= props.obj._id;
    
    const deleteUser  = (id) =>{
      axios.delete('http://localhost:4000/user/delete/'+id).then((res)=>{
          window.alert(res.data)
      })
      
    }
    /*const editUser  = () => {
      return(
        <div className ="update-container">
          <form onSubmit={Submit}>
                <h1>EDIT USER</h1>
                <input type="text" placeholder="NAME" />
                <input type="email" placeholder="EMAIL" />
                <button type="submit">UPDATE AND SAVE</button>
                </form>
        </div>
      )
        
    }*/
    return(
      
      
        <tr>
          <td className='text-dark'>{userName}</td>
          <td className='text-dark'>{userEmail}</td>
          <td className='text-dark'>{id}</td>
          <td className='text-dark'><div className= 'btn-lg btn-success'onClick={()=>{
            props.id(id)
            props.edit(true)
          }} > Edit</div></td>
          <td className='text-dark'><div className= 'btn-lg btn-danger'onClick={()=>deleteUser( props.obj._id)}>Delete</div></td>
        </tr>
       
      
    )
}
export default UserTable;