import Modal from 'react-bootstrap/Modal';

const LaunchModal = ({ show, data, toggleModal }) => {
    const close = () => toggleModal(false);
    if (!data) {
        return null;
    }
    const rocketInfo = [
        {
            label: 'Flight Number',
            value: data.flight_number,
        },
        {
            label: 'Mission Name',
            value: data.mission_name,
        },
        {
            label: 'Rocket Type',
            value: data.rocket_type,
        },
        {
            label: 'Rocket Name',
            value: data.rocket_name,
        },
        {
            label: 'Manufacturer',
            value: data.rocket_manufacturer,
        },
        {
            label: 'Nationality',
            value: data?.nationalities?.join(', '),
        },
        {
            label: 'Launch Date',
            value: data.date_utc,
        },
        {
            label: 'Payload Type',
            value: data.payload_type,
        },
        {
            label: 'Orbit',
            value: data.orbit,
        },
        {
            label: 'Launch Site',
            value: data.launchpad_name,
        },
    ];
    return (
        <Modal
            size="md"
            show={show}
            onHide={close}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="d-flex align-items-start modal-title justify-content-start mb-2">
                        <div className="mr-3">
                            <img
                                className="mission-patch"
                                src={data.links?.patch?.small}
                                alt="mission patch"
                            />
                        </div>
                        <div>
                            <h5>{data?.mission_name}</h5>
                            <div className="pb-2">{data?.rocket_name}</div>
                            <div>
                                {data?.links?.article && (
                                    <a
                                        className="modal-link"
                                        href={data?.links?.article}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="fas fa-newspaper"></i>
                                    </a>
                                )}
                                {data?.links?.wikipedia && (
                                    <a
                                        className="modal-link"
                                        href={data?.links?.wikipedia}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="fab fa-wikipedia-w"></i>
                                    </a>
                                )}
                                {data?.links?.youtube_id && (
                                    <a
                                        className="modal-link"
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`https://www.youtube.com/watch?v=${data?.links?.youtube_id}`}
                                    >
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className={`launch-status mx-1 ${data?.status}`}>
                            {data?.status}
                        </div>
                    </div>
                    {data.details && (
                        <p className="mb-0">
                            {data.details}
                            {data.rocket_wiki && (
                                <a
                                    className="mx-2"
                                    href={data.rocket_wiki}
                                    target="_blank"
                                    without
                                    rel="noreferrer"
                                >
                                    Wikipedia
                                </a>
                            )}
                        </p>
                    )}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="px-2">
                    {rocketInfo.map(info => (
                        <div className="row py-2 info-border" key={info.label}>
                            <div className="col-6">{info.label}</div>
                            <div className="col-6">{info.value}</div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LaunchModal;
