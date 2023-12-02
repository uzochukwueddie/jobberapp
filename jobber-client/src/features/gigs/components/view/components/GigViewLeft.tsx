import { FC, ReactElement } from 'react';

import GigLeftAbout from './GigViewLeft/GigLeftAbout';
import GigLeftOverview from './GigViewLeft/GigLeftOverview';
import GigViewReviews from './GigViewLeft/GigViewReviews';

const GigViewLeft: FC = (): ReactElement => {
  return (
    <>
      <GigLeftOverview />
      <GigLeftAbout />
      <GigViewReviews showRatings={true} hasFetchedReviews={false} />
    </>
  );
};

export default GigViewLeft;
