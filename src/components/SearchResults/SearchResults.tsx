import React, { useContext } from 'react';
import { BookingContext } from '../../App';
import buses from '../../services/fakeData/buses.json'
import SearchResult from './SingleResult';

const SearchResults: React.FC = () => {
    const { searchQuery } = useContext(BookingContext);

    return (
        <div className="search-results">
            <div className="container">
                {/* Dummy searach */}
                {
                    (searchQuery && searchQuery.journeyDate) &&
                    buses.map((bus) => <SearchResult key={bus.id} bus={bus} />)
                }
            </div>
        </div>
    );
};

export default SearchResults;