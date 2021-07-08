import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useLaunch } from '../../context/launchContext';

const DateFilter = () => {
    const [show, setShow] = useState(false);
    const { addFilter } = useLaunch();

    const openModal = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };

    const addDateFilter = (startDate, endDate) => {
        addFilter({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            page: 1,
        });
        closeModal();
    };

    const clearFilter = () => {
        addFilter({
            startDate: null,
            endDate: null,
            page: 1,
        });
        closeModal();
    };

    const addDefaultDateFilter = key => {
        const endDate = new Date();
        const startDate = new Date();

        switch (key) {
            case '1':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case '2':
                startDate.setDate(startDate.getMonth() - 1);
                break;
            case '3':
                startDate.setDate(startDate.getMonth() - 3);
                break;
            case '4':
                startDate.setDate(startDate.getMonth() - 6);
                break;
            case '5':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            case '6':
                startDate.setFullYear(startDate.getFullYear() - 2);
                break;
            default:
                break;
        }

        addDateFilter(startDate, endDate);
    };

    const defaultFilters = [
        {
            label: 'Past week',
            key: '1',
        },
        {
            label: 'Past Month',
            key: '2',
        },
        {
            label: 'Past 3 Months',
            key: '3',
        },
        {
            label: 'Past 6 Months',
            key: '4',
        },
        {
            label: 'Past year',
            key: '5',
        },
        {
            label: 'Past 2 years',
            key: '6',
        },
    ];
    return (
        <div>
            <div
                onClick={openModal}
                className="date-filter-btn text-muted mt-1"
            >
                <i className="far fa-calendar"></i>
                <span className="mx-2">Last 6 Months</span>
                <i className="fas fa-chevron-down"></i>
            </div>

            <Modal size="lg" show={show} onHide={closeModal} centered>
                <Modal.Body>
                    <div className="row">
                        <div className="col-3 border-right">
                            {defaultFilters.map(filter => (
                                <button
                                    onClick={e =>
                                        addDefaultDateFilter(filter.key)
                                    }
                                    key={filter.label}
                                    type="button"
                                    className="btn btn-link text-dark font-weight-bold d-block"
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                        <div className="col-9"></div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-primary" onClick={closeModal}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={clearFilter}>
                        Clear Date Filter
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DateFilter;
