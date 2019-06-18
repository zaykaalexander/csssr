import * as React from 'react';
import { usePager } from '~/hooks';

import { Container } from './Pagination.styled';

type PaginationWithLimit = {
  limit?: true;
  unlimited?: boolean;
  initialLimit?: number;
  limitVariations: number[];
};

type PaginationWithoutLimit = {
  limit?: false;
};

type PaginationLimitType = PaginationWithLimit | PaginationWithoutLimit;

export type PaginationProps = PaginationLimitType & {
  onChange: (page: number, limit: number) => void;
  lastPage?: number;
  initialPage?: number;
  changeOnMount?: boolean;
};

export const Pagination: React.FunctionComponent<PaginationProps> = (props) => {
  const { initialPage, onChange, lastPage, changeOnMount } = props;

  const { currentPage, currentLimit, nextPage, prevPage, setPage, setLimit } = usePager(
    initialPage,
    props.limit ? props.initialLimit : undefined,
  );

  React.useEffect(() => {
    if (changeOnMount) onChange(currentPage, currentLimit);
  }, []);

  React.useEffect(() => {
    if (lastPage !== undefined && lastPage < currentPage) {
      setPage(lastPage);
      onChange(lastPage, currentLimit);
    }
  }, [lastPage]);

  const handleChangePage = (page: number) => {
    if (page === 0 || lastPage === undefined || page <= lastPage) {
      setPage(page);
      onChange(page, currentLimit);
    }
  };

  const handleChangeLimit = (limit: number) => {
    if (props.limit && limit !== currentLimit) {
      setLimit(limit);
      onChange(currentPage, limit);
    }
  };

  return (
    <Container>
      <button
        type="button"
        disabled={currentPage === 1}
        className="pagination__button"
        onClick={() => handleChangePage(currentPage - 1)}
      >
        Prev
      </button>
      {props.limit ? (
        <div className="pagination__limit limit">
          Limit:{' '}
          {props.limitVariations.map((variation) => (
            <button
              type="button"
              key={variation}
              className={`limit__variation ${variation === currentLimit ? 'active' : ''}`}
              onClick={() => handleChangeLimit(variation)}
            >
              {variation}
            </button>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        disabled={lastPage !== undefined && currentPage === lastPage}
        className="pagination__button"
        onClick={() => handleChangePage(currentPage + 1)}
      >
        Next
      </button>
    </Container>
  );
};
