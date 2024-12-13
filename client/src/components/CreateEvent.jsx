/* eslint-disable react/prop-types */

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, Textarea, Button,useToast} from "@chakra-ui/react";
import { CREATE_EVENT } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { useState } from "react";
import { ME } from "../utils/queries";
import{useNavigate} from 'react-router-dom'; // to redirect to single page event 


const CreateEvent = ({ selected_event }) => {
  const [formData, setFormData] = useState({
    eventDate: '',
    description: '',
    friends: '',
  });


  const {loading, error, data} = useQuery(ME)
  const toast = useToast(); // toast function
  const navigate = useNavigate(); // navigate function


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  /* const friends = data?.me?.friends || []; */

  const [createEvent] = useMutation(CREATE_EVENT);


  const handleCreateEvent = async (event) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        console.error("No token found");
        return false;
    }
    if(loading) return <p>Loading ...</p>
    if(error) return <h1>{error.message}</h1>

    try {
        const { data } = await createEvent({
            variables: {
                eventDetails: {
                    eventId: selected_event.eventId,
                    home_team: selected_event.home_team,
                    away_team: selected_event.away_team,
                    description: formData.description,
                    friends: formData.friends.split(','), 
                    eventDate: formData.eventDate,
                },
            },
        });
        console.log("Event created:", data);

        // toast //
        toast ({
          title:"Event Created",
          description:"Your Event Has Been Created :) !",
          status:"success",
          duration:2000,
          isClosable:true
        });
        // navigate to singlepage.jsx ///
        navigate(`/event/:${selected_event.eventId}`);
        
    } catch (err) {
        console.error("Error creating event:", err);
    }
};

  return (
    <>
    
      <h1>
       <ul> <span className="home-team">
       {selected_event.home_team}</span></ul>
        <span className="vs">vs</span>
        <ul><span className="away-team">{selected_event.away_team}</span></ul>
      </h1>
      <form onSubmit={handleCreateEvent}>
        <FormControl>
          <FormLabel>How long will this event run?</FormLabel>
          <Input
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            type="date"
          />
          <FormLabel>Description</FormLabel>
          <Textarea
            type="text"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
          />
        
        </FormControl>
        
          <Button type="submit">
            Create Event
          </Button>
        
      </form>
    
    </>
  );
};

export default CreateEvent;