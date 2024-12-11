import { useState } from "react";
import { Box, Heading, Input, Button, Stack, Grid } from '@chakra-ui/react';
import { FormControl, FormLabel} from '@chakra-ui/form-control'
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import image from '../assets/presentation.jpg'
import Auth from '../utils/auth'
import{ Link} from 'react-router-dom';


const Login = ()=> {
    const [formData, setFormData] = useState({email: '', password: ''})
    const [Login] = useMutation(LOGIN)
    

    const handleInput = (event)=> {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const handleFormSubmit = async(event)=> {
        event.preventDefault()

        try{
            const {data} = await Login({
                variables: {...formData}
            })
            Auth.login(data.login.token)
        }catch(err){
            console.error(err)
        }
    }
    return (
        <>
        <Grid
        className="fullformcontainer"
        templateColumns={{base: '1fr', md: '1fr 1fr'}}
        gap={4}
        position='fixed'
        top='50%'
        left='50%'
        right={0}
        zIndex={1000}
        boxShadow="md"
        transform="translate(-50%, -50%)"
        width="95%"
        height="80vh"
        maxWidth="1200px">

        <Box 
        backgroundImage={`url(${image})`}
        backgroundSize="cover"
        backgroundPosition="center"
        opacity={0.8}
        zIndex={1}
        height={{ base: "180px", md: "auto" }}
        />
        <Box
        boxShadow="lg"
        borderRadius={8}
        borderWidth={1} display="flex"
        justifyContent="center"
        alignItems="center"
        bd="white"
        zIndex={2}
        padding="20px">
        <form onSubmit={handleFormSubmit}>
                        <Heading md={6}>Log In
                        </Heading>
                        <Stack spacing={4}>
                            <FormControl
                                isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInput} 
                                        className='text-white'
                                    />
                            </FormControl>
                            <FormControl
                                isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    value={formData.password}
                                    onChange={handleInput}
                                    name="password"
                                    type="password"
                                    className='text-white' />
                            </FormControl>
                            <Button
                                type="submit"
                                mb={4}>
                                Log In
                            </Button>
                            
                            <Link
                                to='/signup'
                            >
                            Don&apos;t have an account? Signup
                            </Link>
                        </Stack>
                    </form>

        </Box>

        </Grid>
        </>
    )
}
export default Login