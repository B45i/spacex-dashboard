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
    status: getLaunchStatus(r),
    rocket_name: r.rocket.name,
    rocket_manufacturer: r.rocket.company,
    launchpad_name: r.launchpad.name,
    links: r.links,
    details: r.details,
    rocket_wiki: r.rocket.wikipedia,
    rocket_type: r.rocket.type,
    orbit: r.payloads[0].orbit,
    nationalities: r.payloads[0].nationalities,
    payload_type: r.payloads[0].type,
});

const statusQueries = {
    upcoming: { upcoming: true },
    success: { success: true, upcoming: false },
    failed: { success: false, upcoming: false },
};

// "query": {
//     "$and": [
//         {"date_utc": {"$gte": "2017-10-30T19:34:00.000Z"}},
//         {"date_utc": {"$lte": "2017-10-30T19:34:00.000Z"}}
//         ]
// },

const getLaunchQuery = filter => {
    const $and = [];

    if (filter.status !== 'all') {
        $and.push(statusQueries[filter.status]);
    }

    if (filter.startDate) {
        $and.push({ date_utc: { $gte: filter.startDate } });
    }

    if (filter.endDate) {
        $and.push({ date_utc: { $lte: filter.endDate } });
    }

    return $and.length ? { $and } : {};
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
