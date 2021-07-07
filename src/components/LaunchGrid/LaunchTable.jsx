import { useState } from 'react';
import { useLaunch } from '../../context/launchContext';
import LaunchModal from '../LaunchModal';

const LaunchTable = () => {
    const { docs, loading } = useLaunch();
    const [modalData, setModalData] = useState({
        show: false,
        data: null,
    });

    const toggleModal = (show, data) => {
        setModalData({
            show,
            data,
        });
    };

    return (
        <div className="table-container">
            <LaunchModal {...modalData} toggleModal={toggleModal} />

            {loading && (
                <div className="position-absolute launch-loader text-muted">
                    <i className="fa fa-spinner fa-10x fa-spin"></i>
                </div>
            )}

            <table
                className={`table table-borderless ${
                    loading ? 'opacity-50' : ''
                }`}
            >
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
                    {(docs || []).map(i => (
                        <tr
                            onClick={e => toggleModal(true, i)}
                            key={i.flight_number}
                        >
                            <td>
                                {i.flight_number < 10 ? '0' : ''}
                                {i.flight_number}
                            </td>
                            <td>{i.date_utc}</td>
                            <td>{i.launchpad_name}</td>
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
        </div>
    );
};

export default LaunchTable;
