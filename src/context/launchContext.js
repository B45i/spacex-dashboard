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
    // const history = useHistory();

    const [launchState, setLaunchState] = useState({
        loading: true,
        page: 1,
        docs: [],
    });

    useEffect(() => {
        const filters = queryString.parse(search);
        getLaunches(filters).then(launches => {
            setLaunchState(launches);
        });
        setLaunchState(prevState => ({
            ...prevState,
            ...filters,
        }));
    }, [search]);

    // const pushHistory = () => {
    // let path =
    //     '?' +
    //     queryString.stringify({
    //         ...filters,
    //         page: parseInt(filters.page) + 1,
    //     });
    // console.log(path);
    // history.push(path);
    // };

    return (
        <LaunchContext.Provider value={launchState}>
            {children}
        </LaunchContext.Provider>
    );
};
