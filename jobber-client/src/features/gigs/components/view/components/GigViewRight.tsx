import { FC, ReactElement } from 'react';

import GigPackage from './GigViewRight/GigPackage';
import GigRelatedTags from './GigViewRight/GigRelatedTags';
import GigSeller from './GigViewRight/GigSeller';

const GigViewRight: FC = (): ReactElement => {
  return (
    <>
      <GigPackage />
      <GigSeller />
      <GigRelatedTags />
    </>
  );
};

export default GigViewRight;
