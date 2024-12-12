import React from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // Use the query to fetch and display results
  // ...

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {/* Display your search results here */}
    </div>
  );
}

export default SearchResults;