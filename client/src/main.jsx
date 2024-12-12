
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'
import EventPage from './pages/EventPage.jsx'
import JoinEvents from './components/JoinEvents.jsx'

import Login from './components/LoginForm.jsx'
import Signup from './components/SignupForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <h1 className='display-2'>Wrong Route</h1>,
    children: [
      {
        index: true,
        element: <EventPage/>

      },
      { path:'login',
        element:<Login/>

      },
      {
        path: 'signup',
        element: <Signup/>,
      },
      {
        path: 'joinEvents',
        element: <JoinEvents/>
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
 <RouterProvider router={router}/>
 </ChakraProvider>
)
