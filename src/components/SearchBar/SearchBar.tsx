import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { BookingContext } from '../../App';
import './searchBar.css';


const SearchBarReact: React.FC = () => {

    const [districts, setDistricts] = useState([]);
    const { makeSearch } = useContext(BookingContext);
    const [formData, setFormData] = useState({ name: "", email: "", gender: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetch('https://api.allorigins.win/raw?url=https://bdapis.herokuapp.com/api/v1.0/districts')
        .then((res) => res.json())
        .then((data) => setDistricts(data.data))
        .catch((err) => Swal.fire('Something went wrong!', '', 'error') )
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        makeSearch(formData)
    }
    return (
        <div className="search-bar my-5">
            <div className="container">
                <div className="search-box p-3">
                    <form className="form-inline justify-content-center">
                        <div className="form-group mb-2">
                            <label htmlFor="from">From</label>
                            <select    name="from" className="form-control" >
                                {
                                    districts.map((d:any) => (
                                        <option
                                         key={d.district}
                                         value={d.district}
                                         >
                                            {d.district}
                                        </option>)
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <label htmlFor="to">To</label>
                            <select  name="to" className="form-control" >
                                {
                                    districts.map((d:any) => (
                                        <option
                                         key={d.district+"2"}
                                         value={d.district}
                                         >
                                            {d.district}
                                        </option>)
                                    )
                                }
                                
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="from">Journey Date</label>
                            <input onChange={handleChange} name="journeyDate" type="date" className="form-control"  />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <label htmlFor="to">Return Date (optional)</label>
                            <input onChange={handleChange} name="endDate"  type="date"  className="form-control" />
                        </div>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="btn btn-danger mb-2 align-self-end"
                        >Search Buses</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default SearchBarReact; 
