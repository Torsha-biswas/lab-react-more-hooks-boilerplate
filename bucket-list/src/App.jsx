import { useRef, useState } from 'react'
import './App.css'
import { useReducer } from 'react'

function App() {

  let [name,setName]=useState("");
  const inputRef=useRef();

  const reducer=(posts,action)=>{
    switch(action.type){
      case "ADD_POST":
        let newPosts=[...posts,action.payload];
        console.log(newPosts)
        return newPosts;
      case "Change_Toggle":
        // console.log(action.payload)
        let newPost=posts.map((post,idx)=>{
          if(action.payload==idx){
            // post.toggle=!post.toggle;
            return {...post,toggle:!post.toggle}
          }
          return post;
        });
        console.log(newPost,"A")
        return newPost;
      default:
        return posts;
    }

  }


  const [posts, dispatch]=useReducer(reducer,[]);


  const handleSubmit=(event)=>{
    event.preventDefault();
    dispatch({type:"ADD_POST",payload:{name,toggle:true}});
    setName("");
  }

  const handleToggle=(idx)=>{
    dispatch({type:"Change_Toggle",payload:idx})
  }

  const handleFocus=()=>{
    inputRef.current.focus()
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      </form>
      {
         posts?.map((post,idx)=>{
            return <div className='post-div'>
              <h1>{post.toggle?post.name:"This is the hidden content"}</h1>
              <button onClick={()=>handleToggle(idx)}>Toggle</button>
            </div>
         })
      }
       <button onClick={handleFocus}> Get Back to Writing </button>
    </>
  )
}

export default App