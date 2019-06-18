import * as React from 'react';

export const usePager = <T, R>(initialPage: number = 1, initialLimit: number = 10) => {
  const [currentPage, setPage] = React.useState(initialPage);
  const [currentLimit, setLimit] = React.useState(initialLimit);

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => currentPage !== 0 && setPage(currentPage - 1);

  return { currentPage, currentLimit, nextPage, prevPage, setPage, setLimit };
};
