/* eslint-disable react/prop-types */

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, Select, Textarea, Button } from "@chakra-ui/react";
import { CREATE_EVENT } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import { ME } from "../utils/queries";

const CreateEvent = ({ selected_event }) => {
  const [formData, setFormData] = useState({
    eventDate: '',
    description: '',
    friends: '',
  });

  const [friendsList, setFriendsList] = useState([]);

  const {loading, error, data} = useQuery(ME)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const friends = data?.me?.friends || [];

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
    } catch (err) {
        console.error("Error creating event:", err);
    }
};

  return (
    <div>
      <h1>
        {selected_event.home_team} vs {selected_event.away_team}
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
          <FormLabel>Invite friends</FormLabel>
          <Select
            placeholder="Select Friends"
            name="friends"
            value={formData.friends}
            onChange={handleInputChange}
            multiple
          >
            {friends.map((friend) => (
              <option key={friend._id}>
                {friend.username}
              </option>
            ))}
          </Select>
        </FormControl>
        <div className="flex items-center">
          <Button type="submit" className="mt-4 flex mx-auto align-middle">
            Create Event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;