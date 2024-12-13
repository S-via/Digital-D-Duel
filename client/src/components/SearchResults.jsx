import React, { useState } from 'react';
import {useQuery} from '@apollo/client'
import { GET_USERS } from '../utils/queries';


function SearchResults() {
    //build a query that gets a search term
    const [searchTerm, setSearchTerm] = useState('');
    const{loading, error, data} = useQuery(GET_USERS, {
      variables:
      {searchTerm}
    })
    if(loading) return <p>loading...</p>

    if(error) return <p>{error.message}</p>

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    return (
        <div>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <ul>
          {data.getUsers.map((user)=> (
    <li key={user._id}>{user.username}</li>
))}
          </ul>
        </div>
      );
}

export default SearchResults;