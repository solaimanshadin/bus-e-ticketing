import React, { useState, useContext } from 'react';
import Seat from '../Seat/Seat';
import './singleResult.css';
import { RiSteering2Fill } from 'react-icons/ri';
import { MdEventSeat } from 'react-icons/md';
import seatStatus from '../../services/fakeData/seatStatus.json';
import SeatInfo from '../SeatInfo/SeatInfo';
import { BookingContext } from '../../App';

export interface SeatObj {
    seatNumber: string,
    seatClass: string,
    fare: number
}

interface Props {
    bus: {
        name: string,
        id: string,
        type: string,
        seats: SeatObj[],
        startingPoint: string,
        endPoint: string,
        departureTime: string,
        arrivalTime: string,
        ticketPrice: number
    }
}

const SingleResult: React.FC<Props> = (props) => {
    const {
        name,
        id,
        type,
        seats,
        startingPoint,
        endPoint,
        departureTime,
        arrivalTime,
        ticketPrice
    } = props.bus;

    const [showSeatDetails, setShowSeatDetails] = useState<boolean>(false);
    const [selectedSeat, setSelectedSeat] = useState<SeatObj>({
        seatNumber : "",
        fare: 0,
        seatClass: ""
    });
    const { bookings } = useContext(BookingContext);


    const seatSelector = (seat: SeatObj) => {
        setSelectedSeat(seat)
    }
 
    const bookingListOfTheBus: any = bookings.filter((booking:any) => booking.busId === id)
    
    return (
        <div className="bg-white p-4 mb-2">
            <div className="row align-items-center specs">
                <div className="col-md-3 text-left">
                    <h6 className="text-danger">{name}</h6>
                    <h6>{type}</h6>
                    <p>Staring Point : <span className="text-danger">{startingPoint}</span></p>
                    <p>End Point : <span className="text-danger">{endPoint}</span></p>
                </div>
                <div className="col-md-2">
                    <p>Departure Time</p>
                    <p className="text-danger">{departureTime}</p>
                </div>
                <div className="col-md-2">
                    <p>Arrival Time</p>
                    <p className="text-danger">{arrivalTime}</p>
                </div>
                <div className="col-md-2">
                    <p>Seat Available</p>
                    <h6 className="text-danger">{seats.length - bookingListOfTheBus.length}</h6>
                </div>
                <div className="col-md-3">
                    <div className="d-flex justify-content-between">
                        <h3>৳ {ticketPrice.toFixed(2)}</h3>
                        <button
                            onClick={() => setShowSeatDetails(!showSeatDetails)}
                            className={`btn btn-${showSeatDetails ? 'dark' : 'danger'}`}
                        >{showSeatDetails ? "Hide details" : "View Seats"}</button>
                    </div>
                </div>

            </div>
            {
                showSeatDetails &&

                <>
                    <div className="d-flex seat-symbols py-4 mb-2">
                        {
                            seatStatus.map(({id, type } : any) => (
                                <div key={id} className={`symbol ${id}`}>
                                    <MdEventSeat />
                                    <span>{type}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="row seat-details">

                        <div className="col-md-4 mr-md-5">
                            <div className="seat-plan">

                            <div className="diver-area text-right mx-3 pb-5">
                                <RiSteering2Fill />
                            </div>
                            <div className="seats">
                                {
                                    seats.map((seat: SeatObj) => (
                                        <Seat
                                            seat={seat}
                                            selectedSeat={selectedSeat}
                                            setSelector={seatSelector} 
                                            key={seat.seatNumber} 
                                            type={
                                                bookingListOfTheBus.find((booking:any) => booking.seatNumber ===  seat.seatNumber && booking.gender === 'male') ? 'booked-m' : bookingListOfTheBus.find((booking:any) => booking.seatNumber ===  seat.seatNumber && booking.gender === 'female') ? 'booked-f': 'available'
                                            }
                                         />
                                      )
                                    )
                                }
                            </div>
                        </div>
                        </div>

                        <div className="col-md-6">
                            <SeatInfo busId={id} info={selectedSeat} />
                        </div>
                    </div>

                </>
            }
        </div>
    );
};

export default SingleResult;