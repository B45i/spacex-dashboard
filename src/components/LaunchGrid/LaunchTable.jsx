import { useState } from 'react';
import { useLaunch } from '../../context/launchContext';
import LaunchModal from '../LaunchModal';

const LaunchTable = () => {
    const { docs, loading, page } = useLaunch();
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
                    {(!docs || !docs?.length) && (
                        <tr>
                            <td colSpan="7">No data to display</td>
                        </tr>
                    )}
                    {(docs || []).map((launch, i) => (
                        <tr onClick={e => toggleModal(true, launch)} key={i}>
                            <td>{(page - 1) * 10 + i + 1}</td>
                            <td>{launch.date_utc}</td>
                            <td>{launch.launchpad_name}</td>
                            <td>{launch.mission_name}</td>
                            <td>{launch.orbit}</td>
                            <td>
                                <span
                                    className={`launch-status ${launch.status}`}
                                >
                                    {launch.status}
                                </span>
                            </td>
                            <td>{launch.rocket_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LaunchTable;
