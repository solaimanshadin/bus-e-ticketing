import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './searchBar.css';

interface SearchQuerySchema {
    from: string,
    to: string,
    journeyDate: string,
    returnDate: string,
}

const SearchBarReact: React.FC = () => {

    const [searchQuery, setSearchQuery] = useState<SearchQuerySchema | {}>({});
    const [districts, setDistricts] = useState([]);


    useEffect(() => {
        fetch('https://api.allorigins.win/raw?url=https://bdapis.herokuapp.com/api/v1.0/districts')
        .then((res) => res.json())
        .then((data) => setDistricts(data.data))
        .catch((err) => Swal.fire('Something went wrong!', '', 'error') )
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }
    return (
        <div className="search-bar my-5">
            <div className="container">
                <div className="search-box p-3">
                    <form className="form-inline justify-content-center">
                        <div className="form-group mb-2">
                            <label htmlFor="from">From</label>
                            <select className="form-control" >
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
                            <select className="form-control" >
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
                            <input type="date" className="form-control" name="from" />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <label htmlFor="to">Return Date (optional)</label>
                            <input type="date" name="to" className="form-control" />
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
