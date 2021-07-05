import Pagination from 'react-bootstrap/Pagination';
import { Fragment } from 'react';
import { useLaunch } from '../../context/launchContext';

const LaunchPagination = () => {
    const { page, hasPrevPage, hasNextPage, totalPages, addFilter } =
        useLaunch();
    if (!page) {
        return null;
    }
    const changePage = page => {
        addFilter({ page });
    };

    const nextPage = () => changePage(page + 1);
    const previousPage = () => changePage(page - 1);
    const firstPage = () => changePage(1);
    const lastPage = () => changePage(totalPages);

    return (
        <div className="d-flex justify-content-end">
            <Pagination>
                <Pagination.Prev
                    onClick={previousPage}
                    disabled={!hasPrevPage}
                />

                {hasPrevPage && (
                    <Pagination.Item onClick={firstPage}>1</Pagination.Item>
                )}

                <Pagination.Item active>{page}</Pagination.Item>

                {hasNextPage && (
                    <Fragment>
                        <Pagination.Ellipsis disabled />
                        <Pagination.Item onClick={lastPage}>
                            {totalPages}
                        </Pagination.Item>
                    </Fragment>
                )}

                <Pagination.Next onClick={nextPage} disabled={!hasNextPage} />
            </Pagination>
        </div>
    );
};

export default LaunchPagination;
