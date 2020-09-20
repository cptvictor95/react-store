import React from 'react';
import Button from './../Forms/Button/button';

const LoadMore = ({
  onLoadMoreEvt = () => { },
}) => {
  return (
    <Button onClick={() => onLoadMoreEvt()}>
      Load More
    </Button>
  );
};

export default LoadMore;
