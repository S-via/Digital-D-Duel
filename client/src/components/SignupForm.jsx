import { SIGNUP } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import image from '/Digital Duel.gif';
import { FormControl, FormLabel, Grid } from "@chakra-ui/react";
import { Input, Box, Stack, Button, Heading} from "@chakra-ui/react";
import{ Link} from 'react-router-dom';

import Auth from "../utils/auth";
import { useState } from "react";

const Signup = () => {
    const [formData, setFormData ] = useState({username: '', email: '', password: ''})
    const [signup] = useMutation(SIGNUP)
    


    const handleInput = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const handleFormSubmit = async( event ) => {
        event.preventDefault()

        
        try{ 
            const {data} = await signup({
                variables: {...formData}
            })

            Auth.login(data.signup.token)
        }catch(err){
            console.error(err)

        }
        setFormData({
            username: '',
            email: '',
            password: ''
        })
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
        bd="black"
        zIndex={2}
        padding="20px">
        <form onSubmit={handleFormSubmit}>
                        <Heading md={6}>Signup
                        </Heading>
                        <Stack spacing={4}>
                            
                                <FormControl
                                isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        value={formData.username}
                                        onChange={handleInput}
                                        name="username" 
                                        className='text-white'
                                        />
                                </FormControl>
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
                                Sign Up
                            </Button>
                            
                            {/* LOGIN/SIGNUP LINK */}
                            <Link
                                to='/login'
                            >
                            Already a User? Login
                            </Link>
                        </Stack>
                    </form>

        </Box>

        </Grid>
        </>
    )



}
export default Signup;