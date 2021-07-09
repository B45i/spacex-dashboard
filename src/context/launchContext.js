import queryString from 'query-string';
import { createContext, useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getLaunches } from '../services/spacex-service';

const LaunchContext = createContext();

export const useLaunch = () => {
    return useContext(LaunchContext);
};

export const LaunchProvider = ({ children }) => {
    const { search } = useLocation();
    const history = useHistory();

    const [launchState, setLaunchState] = useState({
        loading: true,
    });

    const changeLoading = loading => {
        setLaunchState(prev => ({
            ...prev,
            loading,
        }));
    };

    useEffect(() => {
        const filters = queryString.parse(search);
        changeLoading(true);
        getLaunches(filters)
            .then(launches => {
                setLaunchState({
                    ...filters,
                    ...launches,
                });
            })
            .catch(console.error)
            .finally(() => {
                changeLoading(false);
            });
    }, [search]);

    const addFilter = newFilter => {
        const filters = queryString.parse(search);
        const filterObject = {
            ...filters,
            ...newFilter,
        };

        if (!filterObject.status || filterObject.status === 'all') {
            delete filterObject.status;
        }

        if (!filterObject.startDate) {
            delete filterObject.startDate;
        }

        if (!filterObject.endDate) {
            delete filterObject.endDate;
        }

        let path = '?' + queryString.stringify(filterObject);
        history.push(path);
    };

    return (
        <LaunchContext.Provider value={{ ...launchState, addFilter }}>
            {children}
        </LaunchContext.Provider>
    );
};
