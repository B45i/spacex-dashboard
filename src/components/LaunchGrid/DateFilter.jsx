import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Calendar from 'react-calendar';
import { useLaunch } from '../../context/launchContext';

const DateFilter = () => {
    const [show, setShow] = useState(false);
    const { addFilter } = useLaunch();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (!startDate && !endDate) {
            applyDateFilter();
        }
    }, [startDate, endDate]);

    const openModal = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };

    const applyDateFilter = () => {
        addFilter({
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
            page: 1,
        });
        closeModal();
    };

    const clearFilter = () => {
        setStartDate(null);
        setEndDate(null);
        // useEffect will kick in and clear the filters
    };

    const addDefaultDateFilter = key => {
        const defaultEndDate = new Date();
        const defaultStartDate = new Date();

        switch (key) {
            case '1':
                defaultStartDate.setDate(defaultStartDate.getDate() - 7);
                break;
            case '2':
                defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);
                break;
            case '3':
                defaultStartDate.setMonth(defaultStartDate.getMonth() - 3);
                break;
            case '4':
                defaultStartDate.setMonth(defaultStartDate.getMonth() - 6);
                break;
            case '5':
                defaultStartDate.setFullYear(
                    defaultStartDate.getFullYear() - 1
                );
                break;
            case '6':
                defaultStartDate.setFullYear(
                    defaultStartDate.getFullYear() - 2
                );
                break;
            default:
                break;
        }

        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
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

            <Modal size="xl" show={show} onHide={closeModal} centered>
                <Modal.Header closeButton />

                <Modal.Body>
                    <div className="row">
                        <div className="col-2 border-right">
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

                        <div className="col-10">
                            <div className="row">
                                <div className="col-6">
                                    <Calendar
                                        value={startDate}
                                        onChange={setStartDate}
                                    />
                                </div>
                                <div className="col-6">
                                    <Calendar
                                        value={endDate}
                                        onChange={setEndDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        onClick={clearFilter}
                        className="btn btn-outline-primary"
                    >
                        Clear Date Filter
                    </button>
                    <button
                        onClick={applyDateFilter}
                        className="btn btn-primary"
                    >
                        Apply Date Filter
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DateFilter;
