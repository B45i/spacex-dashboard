const LaunchFilter = () => {
    return (
        <div className="d-flex justify-content-between align-items-start">
            <div>Last 6 Months</div>

            <div className="d-flex align-items-baseline">
                <i className="fa fa-filter text-muted"></i>
                <select className="form-control w-auto mb-3 border-0">
                    <option>All Launches</option>
                    <option>Upcoming Launches</option>
                    <option>Successful Launches</option>
                    <option>Failed Launches</option>
                </select>
            </div>
        </div>
    );
};

export default LaunchFilter;
