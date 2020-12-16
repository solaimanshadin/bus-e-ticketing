import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { BookingContext } from '../../App';

interface Props {
    busId: string,
    seatNumber: string
}

const BookingModal: React.FC<Props> = ({ busId, seatNumber }) => {

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({ name: "", email: "", gender: "" })
    const { bookSeat } = useContext(BookingContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
    const olderBookings: any = localStorage.getItem('bookings');
    const parsedOldBookings: any = (olderBookings && JSON.parse(olderBookings)) || [];

    const seatPairNumber = seatNumber?.split('-')[0];

    const makeBooking = () => {
        const genderMismatch: any = parsedOldBookings.find((booking: any) => {
            return booking.seatNumber.includes(seatPairNumber) && booking.gender === 'female' && formData.gender !== 'female'
        })
        const validEmailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        
        if(!validEmailPattern.test(formData.email) ) {
            return Swal.fire("", 'Valid Email address required!', 'info')
        }else if(!formData.gender) {
            return Swal.fire("", 'Gender filed is mandatory!', 'info')
        }else if (genderMismatch) {
            handleClose()
            return Swal.fire("Can't Book the seat", '', 'error')
        }
        handleClose();
        bookSeat(busId, seatNumber, formData.gender)
        
    }
    return (
        <div>
            <div className="text-center">
                {
                    (!parsedOldBookings.find((booking: any) => booking.seatNumber === seatNumber && booking.busId === busId) && seatNumber) &&
                    <Button onClick={handleShow}> Book Now</Button>
                }
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Passenger Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input onChange={handleChange} type="name" name="name" className="form-control" placeholder="Enter Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Email</label>
                        <input onChange={handleChange}  type="email" name="email" className="form-control" placeholder="Enter Email" />
                    </div>
                    <div className="gender-selection">
                        <div>
                            <label>Gender</label>

                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={handleChange} className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="male" />
                            <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={handleChange} className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="female" />
                            <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={makeBooking} variant="primary">Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookingModal;

