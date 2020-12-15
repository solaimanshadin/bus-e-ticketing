import React from 'react';
import BookingModal from '../BookingModal/BookingModal';
import { SeatObj } from '../SearchResults/SingleResult';
interface Props {
    info: SeatObj,
    busId: string
}
const SeatInfo: React.FC<Props> = (props) => {

    const {
        seatNumber,
        seatClass,
        fare
    } = props.info;


    return (

        <div>
            <h4 className="text-danger text-uppercase">Seat Information</h4>
            <div className="seat-info">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Seat</th>
                            <th>Class</th>
                            <th>Fare</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{seatNumber}</td>
                            <td>{seatClass}</td>
                            <td>{fare.toFixed(2)}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <BookingModal busId={props.busId} seatNumber={seatNumber} />
        </div>
    );
};

export default SeatInfo;