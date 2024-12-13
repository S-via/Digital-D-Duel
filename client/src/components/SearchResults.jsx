import { useState } from 'react';
import {useQuery} from '@apollo/client'
import { GET_USERS } from '../utils/queries';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
    //build a query that gets a search term
   const [searchParams]  = useSearchParams()
   const query = searchParams.get('q')
    const{loading, error, data} = useQuery(GET_USERS, {
      variables:
      {searchTerm: query}

    })
    if(!query){
      return <p>Please enter a search term</p>
    }
    if(loading) return <p>loading...</p>

    if(error) return <p>{error.message}</p>


    return (
      <div>
      <h1>Search Results for "{query}"</h1>
      {data?.getUsers?.length > 0 ? (
          <ul>
              {data.getUsers.map((user) => (
                  <li key={user._id}>{user.username}</li>
              ))}
          </ul>
      ) : (
          <p>No users found.</p>
      )}
  </div>
      );
}

export default SearchResults;