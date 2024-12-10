
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'
import EventPage from './pages/EventPage.jsx'

import LoginSign from './components/LoginSign.jsx'

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
      { path:'loginsign',
        element:<LoginSign/>

      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
 <RouterProvider router={router}/>
 </ChakraProvider>
)
