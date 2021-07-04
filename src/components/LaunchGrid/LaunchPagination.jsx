import Pagination from 'react-bootstrap/Pagination';
import { Fragment } from 'react';

const LaunchPagination = ({ page, hasPrevPage, hasNextPage, totalPages }) => {
    if (!page) {
        return null;
    }
    return (
        <div className="d-flex justify-content-end">
            <Pagination>
                <Pagination.Prev disabled={!hasPrevPage} />
                {hasPrevPage && <Pagination.Item>1</Pagination.Item>}
                <Pagination.Item active>{page}</Pagination.Item>

                {hasNextPage && (
                    <Fragment>
                        <Pagination.Ellipsis disabled />
                        <Pagination.Item>{totalPages}</Pagination.Item>
                    </Fragment>
                )}
                <Pagination.Next disabled={!hasNextPage} />
            </Pagination>
        </div>
    );
};

export default LaunchPagination;
