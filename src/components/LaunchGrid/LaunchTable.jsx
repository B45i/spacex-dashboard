import { useLaunch } from '../../context/launchContext';

const LaunchTable = () => {
    const { docs, loading } = useLaunch();
    if (!docs) {
        return null;
    }

    return (
        <div className="table-container">
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
        </div>
    );
};

export default LaunchTable;
