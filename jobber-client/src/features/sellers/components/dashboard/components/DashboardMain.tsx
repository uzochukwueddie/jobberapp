import { filter } from 'lodash';
import { FC, Fragment, ReactElement, useState } from 'react';
import { FaMapMarkerAlt, FaRegClock, FaUserAlt } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { SellerContextType } from 'src/features/sellers/interfaces/seller.interface';
import GigCardItem from 'src/shared/gigs/GigCardItem';
import StarRating from 'src/shared/rating/StarRating';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { rating, sellerOrderList } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

import ActiveOrderTable from './ActiveOrderTable';

const DashboardMain: FC = (): ReactElement => {
  const [type, setType] = useState<string>('active');
  const { gigs, pausedGigs, orders, seller } = useOutletContext<SellerContextType>();
  const activeGigs: ISellerGig[] = filter(gigs, (gig: ISellerGig) => gig.active === true);

  return (
    <div className="flex flex-wrap gap-x-4">
      <div className="order-firsts w-full py-4 xl:w-1/3">
        <StickyBox offsetTop={20} offsetBottom={20}>
          <div className="border-grey border bg-white py-2">
            <div className="flex flex-col gap-y-3 pt-2">
              <img
                className="flex h-20 w-20 self-center rounded-full object-cover md:h-24 md:w-24 lg:h-28 lg:w-28"
                src={seller?.profilePicture}
                alt="Seller image"
              />
              <div className="flex flex-col self-center">
                <div className="flex cursor-pointer self-center">
                  <span className="text-base font-bold">{seller?.username}</span>
                </div>
                <span className="flex self-center px-4 text-center text-xs md:text-sm">{seller?.oneliner}</span>
                {seller?.ratingSum && seller?.ratingsCount ? (
                  <div className="flex w-full justify-center gap-x-1 self-center">
                    <div className="mt-1 w-20 gap-x-2">
                      <StarRating value={rating(seller?.ratingSum / seller?.ratingsCount)} size={14} />
                    </div>
                    <div className="ml-2 mt-[2px] flex gap-1 text-sm">
                      <span className="text-orange-400">{rating(seller?.ratingSum / seller?.ratingsCount)}</span>
                      <span>{seller?.ratingsCount}</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="border-grey mb-2 mt-3 border-b" />
            <ul className="mb-0 list-none px-2 pt-1.5">
              <li className="mb-4 flex flex-col justify-between text-xs sm:mb-2 sm:flex-row sm:text-sm">
                <div className="col-span-3 ml-3 flex pb-0 sm:pb-3">
                  <FaMapMarkerAlt className="mr-2 mt-1" />
                  <div className="mr-3">From</div>
                </div>
                <div className="ml-8 mr-4 font-bold sm:ml-0">{seller?.country}</div>
              </li>
              <li className="mb-4 flex flex-col justify-between text-xs sm:mb-2 sm:flex-row sm:text-sm">
                <div className="col-span-3 ml-3 flex pb-0 sm:pb-3">
                  <FaUserAlt className="mr-2 mt-1" />
                  <div className="mr-3">Member since</div>
                </div>
                <div className="ml-8 mr-4 font-bold sm:ml-0">{TimeAgo.formatDateToMonthAndYear(`${seller?.createdAt || new Date()}`)}</div>
              </li>
              <li className="mb-4 flex flex-col justify-between text-xs sm:mb-2 sm:flex-row sm:text-sm">
                <div className="col-span-3 ml-3 flex pb-0 sm:pb-3">
                  <FaRegClock className="mr-2 mt-1" />
                  <div className="mr-3">Avg. Response Time</div>
                </div>
                <div className="ml-8 mr-4 font-bold sm:ml-0">
                  {seller?.responseTime} hour{seller?.responseTime === 1 ? '' : 's'}
                </div>
              </li>
              <li className="mb-4 flex flex-col justify-between text-xs sm:mb-2 sm:flex-row sm:text-sm">
                <div className="col-span-3 ml-3 flex pb-0 sm:pb-3">
                  <FaRegClock className="mr-2 mt-1" />
                  <div className="mr-3">Last Delivery</div>
                </div>
                <div className="ml-8 mr-4 font-bold sm:ml-0">{TimeAgo.dateInDays(`${seller?.recentDelivery}`)}</div>
              </li>
            </ul>
          </div>
        </StickyBox>
      </div>

      <div className="w-full py-4 xl:w-[65%]">
        <div className="border-grey border bg-white">
          <ul className="flex w-full cursor-pointer list-none flex-col px-6 md:flex-row">
            <li
              onClick={() => setType('active')}
              className={`mr-9 w-full py-3 text-xs font-bold md:w-auto md:py-5 md:text-sm ${
                type === 'active' ? 'text-sky-500 md:border-b-2 md:border-sky-500' : ''
              }`}
            >
              ACTIVE GIGS
            </li>
            <li
              onClick={() => setType('paused')}
              className={`mr-9 w-full py-3 text-xs font-bold md:w-auto md:py-5 md:text-sm ${
                type === 'paused' ? 'text-sky-500 md:border-b-2 md:border-sky-500' : ''
              }`}
            >
              PAUSED
            </li>
            <li
              onClick={() => setType('orders')}
              className={`mr-9 w-full py-3 text-xs font-bold md:w-auto md:py-5 md:text-sm ${
                type === 'orders' ? 'text-sky-500 md:border-b-2 md:border-sky-500' : ''
              }`}
            >
              ACTIVE ORDERS
            </li>
          </ul>
        </div>
        <div className="my-3">
          {type === 'active' && (
            <div className="grid gap-x-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {activeGigs.map((gig: ISellerGig) => (
                <Fragment key={uuidv4()}>
                  <GigCardItem gig={gig} />
                </Fragment>
              ))}
            </div>
          )}
          {type === 'paused' && (
            <div className="grid gap-x-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pausedGigs.map((gig: ISellerGig) => (
                <Fragment key={uuidv4()}>
                  <GigCardItem gig={gig} />
                </Fragment>
              ))}
            </div>
          )}
          {type === 'orders' && <ActiveOrderTable activeOrders={sellerOrderList('in progress', orders)} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
