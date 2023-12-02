import { find } from 'lodash';
import { FC, ReactElement, useEffect, useRef } from 'react';
import { FaPencilAlt, FaRegStar, FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { IGigCardItems, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { rating, replaceAmpersandAndDashWithSpace } from 'src/shared/utils/utils.service';
import { socket, socketService } from 'src/sockets/socket.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { lowerCase, replaceSpacesWithDash } from '../utils/utils.service';

const GigCardDisplayItem: FC<IGigCardItems> = ({ gig, linkTarget, showEditIcon }): ReactElement => {
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const sellerUsername = useRef<string>('');
  const title: string = replaceSpacesWithDash(gig.title);
  const navigate: NavigateFunction = useNavigate();

  const navigateToEditGig = (gigId: string): void => {
    navigate(`/manage_gigs/edit/${gigId}`, { state: gig });
  };

  const saveGigTitle = (gig: ISellerGig): void => {
    if (authUser?.username) {
      const category: string = replaceAmpersandAndDashWithSpace(gig.categories);
      socket.emit('category', category, authUser.username);
    }
  };

  useEffect(() => {
    socketService.setupSocketConnection();
    socket.emit('getLoggedInUsers', '');
    socket.on('online', (data: string[]) => {
      sellerUsername.current = find(data, (name: string) => name === gig.username) as string;
    });
  }, [authUser.username, gig.username]);

  return (
    <div className="rounded">
      <div className="mb-8 flex cursor-pointer flex-col gap-2">
        <Link to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`} onClick={() => saveGigTitle(gig)}>
          <LazyLoadImage
            src={gig.coverImage}
            alt="Gig cover image"
            className="w-full rounded-lg"
            wrapperClassName="bg-center"
            placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
            effect="opacity"
          />
        </Link>
        <div className="flex items-center gap-2 relative">
          <LazyLoadImage
            src={gig.profilePicture}
            alt="Profile image"
            className="h-7 w-8 rounded-full object-cover"
            wrapperClassName="bg-center"
            placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
            effect="opacity"
          />
          {sellerUsername.current === gig.username && (
            <span className="bottom-0 left-5 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
          )}
          <div className="flex w-full justify-between">
            <span className="text-md hover:underline">
              {linkTarget ? (
                <Link
                  to={`/seller_profile/${lowerCase(`${gig.username}`)}/${gig.sellerId}/${
                    seller.username === gig.username ? 'edit' : 'view'
                  }`}
                >
                  <strong className="text-sm font-medium md:text-base">{gig.username}</strong>
                </Link>
              ) : (
                <strong className="text-sm font-medium md:text-base">{gig.username}</strong>
              )}
            </span>
            {showEditIcon && <FaPencilAlt className="mr-2 flex self-center" size={15} onClick={() => navigateToEditGig(`${gig.id}`)} />}
          </div>
        </div>
        <div>
          <Link to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`} onClick={() => saveGigTitle(gig)}>
            <p className="line-clamp-2 text-sm text-[#404145] hover:underline md:text-base">{gig.basicDescription}</p>
          </Link>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          {parseInt(`${gig.ratingsCount}`) > 0 ? <FaStar /> : <FaRegStar />}
          <strong className="text-sm font-bold">({rating(parseInt(`${gig.ratingSum}`) / parseInt(`${gig.ratingsCount}`))})</strong>
        </div>
        <div>
          <strong className="text-sm font-bold md:text-base">From ${gig.price}</strong>
        </div>
      </div>
    </div>
  );
};

export default GigCardDisplayItem;
