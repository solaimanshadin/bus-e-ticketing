import React from 'react';
import buses from '../../services/fakeData/buses.json'
import SearchResult from './SingleResult';

const SearchResults: React.FC = () => {
    return (
        <div className="search-results">
            <div className="container">
                {
                    buses.map((bus) => <SearchResult bus={bus} />)
                }
            </div>
        </div>
    );
};

export default SearchResults;