import { useEffect, useState } from 'react';

import { getLaunches } from '../../services/spacex-service';
import LaunchTable from './LaunchTable';
import LaunchFilter from './LaunchFilter';
import LaunchPagination from './LaunchPagination';

const LaunchGrid = () => {
    // todo: proper state management
    const [launches, setlaunches] = useState({});
    useEffect(() => {
        getLaunches().then(l => setlaunches(l));
    }, []);

    return (
        <div className="container">
            <LaunchFilter />
            <LaunchTable docs={launches.docs || []} />
            <LaunchPagination {...launches} />
        </div>
    );
};

export default LaunchGrid;
