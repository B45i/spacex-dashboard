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
    rocket_manufacturer: r.rocket.company,
    launchpad_name: r.launchpad.name,
    links: r.links,
    details: r.details,
    nationalities: r.payloads[0].nationalities,
    payload_type: r.payloads[0].type,
});

const statusQueries = {
    all: null,
    upcoming: { upcoming: true },
    success: { success: true, upcoming: false },
    failed: { success: false, upcoming: false },
};

const getLaunchQuery = filter => {
    return {
        ...statusQueries[filter.status || 'all'],
    };
};

const getLaunchBody = filter => ({
    query: getLaunchQuery(filter),
    options: {
        limit: 12,
        page: filter.page || 1,
        pagination: true,
        populate: ['rocket', 'launchpad', 'payloads'],
    },
});

export const getLaunches = async filter => {
    const response = await API.post(`launches/query`, getLaunchBody(filter));

    if (!response.data) {
        return {};
    }

    const launches = {
        ...response.data,
        status: filter.status,
        docs: (response.data.docs || []).map(launchMapper),
    };
    return launches;
};
