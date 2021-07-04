import axios from 'axios';

const baseURL = 'https://api.spacexdata.com/v4/';

const API = axios.create({
    baseURL,
});

const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
};

const launchOptions = {
    query: {},
    options: {
        // offset: 0,
        limit: 12,
        page: 1,
        pagination: true,
        populate: ['rocket', 'launchpad', 'payloads'],
    },
};

const getLaunchStatus = r => {
    if (r.upcoming) {
        return 'Upcoming';
    } else if (r.success) {
        return 'Success';
    } else {
        return 'Failed';
    }
};

const launchMapper = r => ({
    flight_number: r.flight_number,
    date_utc: new Date(r.date_utc).toLocaleDateString('en-US', dateOptions),
    mission_name: r.name,
    orbit: r.payloads[0].orbit,
    status: getLaunchStatus(r),
    rocket_name: r.rocket.name,
    launchpad_ame: r.launchpad.name,
});

export const getLaunches = async () => {
    const response = await API.post(`launches/query`, launchOptions);

    if (!response.data) {
        return {};
    }

    const launches = {
        ...response.data,
        docs: (response.data.docs || []).map(launchMapper),
    };
    return launches;
};
