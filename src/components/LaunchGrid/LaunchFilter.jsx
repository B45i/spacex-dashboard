import { useLaunch } from '../../context/launchContext';

const LaunchFilter = () => {
    const { status, addFilter } = useLaunch();
    const changeStatus = ({ target }) => {
        addFilter({
            page: 1,
            status: target.value || '',
        });
    };
    const options = [
        { value: 'all', label: 'All Launches' },
        { value: 'upcoming', label: 'Upcoming Launches' },
        { value: 'success', label: 'Successful Launches' },
        { value: 'failed', label: 'Failed Launches' },
    ];
    return (
        <div className="d-flex justify-content-between align-items-start">
            <div>Last 6 Months</div>

            <div className="d-flex align-items-baseline">
                <i className="fa fa-filter text-muted"></i>
                <select
                    onChange={changeStatus}
                    value={status}
                    className="form-control w-auto mb-3 border-0"
                >
                    {options.map((o, i) => (
                        <option key={i} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default LaunchFilter;
