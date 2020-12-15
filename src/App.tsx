import React, { createContext, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

interface Booking {
  busId: number;
  seatNumber: string;
  gender: string;
}
export interface BookingContextData {
  bookings: Booking[];
}
export const BookingContextDefaultValue: BookingContextData = {
  bookings: []
}
 
export const PostsContext = createContext<BookingContextData>(BookingContextDefaultValue);

function App() {
  // useEffect(() => {
  //   const olderBookings: any = localStorage.getItem('bookings');
  //   const parsedOldBookings: any = (olderBookings && JSON.parse(olderBookings)) || [];

  // }, [])
  return (
    <PostsContext.Provider value={BookingContextDefaultValue} >
      <SearchBar />
      <SearchResults />
    </PostsContext.Provider>
  );
}

export default App;
