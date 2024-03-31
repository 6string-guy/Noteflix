import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import  authService  from './appwrite/auth.js'
import { Header,Footer } from './components/index.js'
import { Outlet } from 'react-router-dom'
import { login, logout } from './store/authSlice.js'

function App() {
 const [loading, setLoading]=useState(true)
 const dispatch=useDispatch()
 useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData)
    {
      dispatch(login(userData))
    }
    else 
    {
      dispatch( logout())
    }
  })
  .finally(()=>setLoading(false))
 }, [])

  if( !loading)
  {
    return (
      <div className='min-h-full bg-grey-400 flex flex-wrap content-between'>
        <div className='w-full block'>
          <Header/>
          <main>
            
          </main>
          <Footer/>

        </div>

      </div>
    )
  }
  else
  {
    return null
  }
}

export default App
