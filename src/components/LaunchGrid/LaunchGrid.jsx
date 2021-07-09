import { LaunchProvider } from '../../context/launchContext';
import LaunchFilter from './LaunchFilter';
import LaunchTable from './LaunchTable';
import LaunchPagination from './LaunchPagination';

import './LaunchGrid.css';

const LaunchGrid = () => {
    return (
        <LaunchProvider>
            <div className="container">
                <LaunchFilter />
                <LaunchTable />
                <LaunchPagination />
            </div>
        </LaunchProvider>
    );
};

export default LaunchGrid;
