
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'
import EventPage from './pages/EventPage.jsx'
import JoinEvents from './components/JoinEvents.jsx';
import FollowedEventsPage from './pages/ProfilePage.jsx';

import Login from './components/LoginForm.jsx'
import Signup from './components/SignupForm.jsx'
import CreateEvent from './components/CreateEvent.jsx'
import SearchResults from './components/SearchResults.jsx'



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
        element: <Signup/>
      },
      { path:'/profile/:username',
        element:<FollowedEventsPage/>

      },
      {
        path: '/me',
        element: <FollowedEventsPage/>
      },

      {
        path: 'joinEvents',
        element: <JoinEvents/>
      },
      {
        path: 'createEvent',
        element: <CreateEvent/>
      },
      {
        path:'search',
        element: <SearchResults/>
      }
      

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
 <RouterProvider router={router}/>
 </ChakraProvider>
)
