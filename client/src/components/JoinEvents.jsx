import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "../utils/queries";
import JoinButton from "./JoinButton";

const JoinEvents = () => {
    const { data, loading, error } = useQuery(GET_ALL_EVENTS);


    if (loading) return <p>Loading events...</p>;


    if (error) return <p>Error fetching events: {error.message}</p>;

    
    if (!data || !data.getAllEvents || data.getAllEvents.length === 0) {
        return <p>No events available at the moment.</p>;
    }

    return (
        <div>
            <h1>Available Events</h1>
            {data.getAllEvents.map((event) => (
                <div
                    key={event._id}
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        margin: "10px",
                    }}
                >
                    <h2>
                        {event.home_team} vs {event.away_team}
                    </h2>
                    <p>{event.description}</p>
                    <p>Event Date: {event.eventDate}</p>
                    <p>Created by: {event.creator?.username || "Unknown"}</p>
                    <h3>Participants:</h3>
                    <ul>
                        {event.friends?.map((user) => (
                            <li key={user._id}>{user.username}</li>
                        )) || <li>No friends available</li>}
                    </ul>
                    <JoinButton
                        eventId={event._id}
                        creatorFriends={event.creator?.friends || []}
                    />
                </div>
            ))}
        </div>
    );
};

export default JoinEvents;