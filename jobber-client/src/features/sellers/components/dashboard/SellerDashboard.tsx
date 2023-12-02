import { FC, ReactElement } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Button from 'src/shared/button/Button';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import { useAppDispatch } from 'src/store/store';

import { ISellerDocument, SellerContextType } from '../../interfaces/seller.interface';
import ProfileHeader from '../profile/components/ProfileHeader';
import DashboardMain from './components/DashboardMain';

const SellerDashboard: FC = (): ReactElement => {
  const { seller } = useOutletContext<SellerContextType>();
  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="mt-10 flex flex-col justify-between gap-y-4">
        <ProfileHeader showHeaderInfo={false} showEditIcons={false} sellerProfile={seller as ISellerDocument} />
        <div className="self-end">
          <Button
            onClick={() => dispatch(updateHeader('home'))}
            className="bg-green-transparent w-full rounded-md text-center text-xs font-bold text-green-500 hover:text-green-600 focus:outline-none md:bg-green-500 md:px-3 md:py-2 md:text-sm md:text-white hover:md:bg-green-600 hover:md:text-white"
            label={<Link to={`/manage_gigs/new/${seller?._id}`}>Create a new gig</Link>}
          />
        </div>
      </div>
      <DashboardMain />
    </div>
  );
};

export default SellerDashboard;
