import { FC, ReactElement } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { IGigsProps, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { rating, replaceSpacesWithDash } from 'src/shared/utils/utils.service';

const GigIndexItem: FC<IGigsProps> = ({ gig }): ReactElement => {
  const gigData: ISellerGig = gig as ISellerGig;
  const title: string = replaceSpacesWithDash(gigData.title);

  return (
    <div className="rounded">
      <div className="mb-8 flex cursor-pointer flex-col gap-2">
        <Link to={`/gig/${gigData.id}/${title}`}>
          <LazyLoadImage
            src={gigData.coverImage}
            alt="Gig cover image"
            className="w-full rounded-lg"
            placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
            effect="blur"
          />
        </Link>
        <div className="flex items-center gap-2">
          <LazyLoadImage
            src={gigData.profilePicture}
            alt="profile"
            className="h-7 w-7 rounded-full object-cover"
            placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
            effect="blur"
          />
          <div className="flex w-full justify-between">
            <span className="text-md hover:underline">
              <strong className="text-sm font-medium md:text-base">{gigData.username}</strong>
            </span>
          </div>
        </div>
        <div>
          <Link to={`/gig/${gigData.id}/${title}`}>
            <p className="line-clamp-2 text-sm text-[#404145] hover:underline md:text-base">{gigData.basicDescription}</p>
          </Link>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          {parseInt(`${gigData.ratingsCount}`) > 0 ? <FaStar /> : <FaRegStar />}
          <strong className="text-sm font-bold">({rating(parseInt(`${gigData.ratingSum}`) / parseInt(`${gigData.ratingsCount}`))})</strong>
        </div>
        <div>
          <strong className="text-sm font-bold md:text-base">From ${gigData.price}</strong>
        </div>
      </div>
    </div>
  );
};

export default GigIndexItem;
