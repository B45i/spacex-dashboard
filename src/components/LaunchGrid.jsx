import { useEffect, useState } from 'react';
import { getLaunches } from '../services/spacex-service';
import Pagination from 'react-bootstrap/Pagination';

const LaunchGrid = () => {
    // todo: proper state management
    const [launches, setlaunches] = useState({});
    useEffect(() => {
        getLaunches().then(l => setlaunches(l));
    }, []);

    return (
        <div className="container">
            {/* filter place holder */}
            <div className="d-flex justify-content-between">
                <div>Last 6 Months</div>

                <select className="form-control w-auto mb-3">
                    <option>All Launches</option>
                    <option>Upcoming Launches</option>
                    <option>Successful Launches</option>
                    <option>Failed Launches</option>
                </select>
            </div>

            {/* table place holder*/}
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Launched (UTC)</th>
                        <th>Location</th>
                        <th>Mission</th>
                        <th>Orbit</th>
                        <th>Launch Status</th>
                        <th>Rocket</th>
                    </tr>
                </thead>
                <tbody>
                    {(launches.docs || []).map(i => (
                        <tr key={i.flight_number}>
                            <td>
                                {i.flight_number < 10 ? '0' : ''}
                                {i.flight_number}
                            </td>
                            <td>{i.date_utc}</td>
                            <td>{i.launchpad_ame}</td>
                            <td>{i.mission_name}</td>
                            <td>{i.orbit}</td>
                            <td>
                                <span className={`launch-status ${i.status}`}>
                                    {i.status}
                                </span>
                            </td>
                            <td>{i.rocket_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-end">
                <div></div>
                <Pagination>
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item active>{2}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                </Pagination>
            </div>
        </div>
    );
};

export default LaunchGrid;
