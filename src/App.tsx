import React, { createContext, useEffect, useState, useCallback } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import { interval } from 'rxjs';
import {
    scan,
    share,
    startWith,
    takeWhile
} from 'rxjs/operators';
import Swal from 'sweetalert2';

interface Booking {
  busId: number;
  seatNumber: string;
  gender: string;
}
interface SearchQuery {
    from: string,
    to: string,
    journeyDate: string,
    returnDate?: string
  
}

export interface BookingContextData {
  bookings: Booking[];
  searchQuery: SearchQuery;
  makeSearch: (fromData:any) => void
  fetchBookings: () => void;
  bookSeat: (busId: string, seatNumber: string, gender: string) => void;
  unBookSeat: (busId: string, seatNumber: string) => void;
}


export const BookingContextDefaultValue: BookingContextData = {
  bookings: [],
  searchQuery: {
    to: '',
    from: '',
    journeyDate: '',
    returnDate: ''
  },
  makeSearch: () => null,
  fetchBookings: () => null,
  bookSeat: () => null,
  unBookSeat: () => null
}

const observable$ = interval(1000 * 60 * 10).pipe(
  startWith(1000 * 60 * 10),
  scan(time => time - 1),
  takeWhile(time => time > 0)
)
.pipe(share());

export const BookingContext = createContext<BookingContextData>(BookingContextDefaultValue);

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    to: '',
    from: '',
    journeyDate: '',
    returnDate: ''
  });
  const makeSearch = (fromData: SearchQuery) => {
    setSearchQuery(fromData)
  }
  const fetchBookings = useCallback(() => {
    const olderBookings: any = localStorage.getItem('bookings');
    const parsedOldBookings: any = (olderBookings && JSON.parse(olderBookings)) || [];
    setBookings(parsedOldBookings);
  }, [setBookings]);
 
  const bookSeat = useCallback((busId, seatNumber, gender) => {
    const olderBookings: any = localStorage.getItem('bookings');
    const parsedOldBookings: any = (olderBookings && JSON.parse(olderBookings)) || [];
    const sub: any = observable$.subscribe(() => localStorage.setItem('bookings', olderBookings));
        const newBookingArr: any = [...parsedOldBookings, { busId, seatNumber, gender}];
        setBookings(newBookingArr)
        localStorage.setItem('bookings', JSON.stringify(newBookingArr));
        Swal.fire('Booing Successful', '', 'success')
        return () => sub.unsubscribe()
  }, [setBookings]);
  
  const unBookSeat = () => {
    // get get new data from localStroage
    fetchBookings();
  }

  useEffect(() => {
    fetchBookings();
    observable$.subscribe();
  }, [])

  return (
    <BookingContext.Provider value={{
      bookings,
      searchQuery,
      makeSearch,
      fetchBookings,
      bookSeat,
      unBookSeat
    }} >
      <SearchBar />
      <SearchResults />
    </BookingContext.Provider>
  );
}

export default App;
