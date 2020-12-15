import React from 'react';
import { MdEventSeat } from 'react-icons/md';
import { SeatObj } from '../SearchResults/SingleResult';
import './seat.css';

type Props = {
    type: string,
    setSelector?: any,
    selectedSeat?: SeatObj,
    seat?: SeatObj
}

const Seat: React.FC<Props> = ({ type, setSelector, selectedSeat, seat }) => {
    return (
        <div className={`seat  ${selectedSeat && (selectedSeat?.seatNumber === seat?.seatNumber) && !type.includes('booked') ? 'selected' : type}`} >
           
            <MdEventSeat
                onClick={() => setSelector(seat)}
                style={{ cursor: 'pointer' }}
            />
                   
        </div>
    );
};

export default Seat;