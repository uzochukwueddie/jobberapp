import { FC, ReactElement } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IGigPaginateProps, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { v4 as uuidv4 } from 'uuid';

let itemOffset = 1;

const GigPaginate: FC<IGigPaginateProps> = ({
  gigs,
  totalGigs,
  showNumbers,
  itemsPerPage,
  setItemFrom,
  setPaginationType
}): ReactElement => {
  const paginationCount: number[] = [...Array(Math.ceil((totalGigs as number) / itemsPerPage)).keys()];

  return (
    <div className="flex w-full justify-center">
      <ul className="flex gap-8">
        <div
          className={`cursor-pointer p-3 ${itemOffset - 1 > 0 ? 'rounded-full border border-sky-400' : 'cursor-not-allowed text-gray-400'}`}
          onClick={() => {
            if (itemOffset - 1 > 0) {
              itemOffset -= 1;
              setPaginationType('backward');
              const firstItem: ISellerGig = gigs[0];
              setItemFrom(`${firstItem.sortId}`);
            }
          }}
        >
          <FaArrowLeft className="flex self-center" />
        </div>
        {showNumbers &&
          paginationCount.map((_, index: number) => (
            <li
              key={uuidv4()}
              className={`cursor-pointer px-3 py-2 ${itemOffset === index + 1 ? 'border-b-2 border-black font-bold text-black' : ''}`}
              onClick={() => {
                const selectedPage = index + 1;
                itemOffset += 1;
                if (itemOffset < index + 1) {
                  setPaginationType('forward');
                  setItemFrom(`${selectedPage * itemsPerPage - itemsPerPage}`);
                } else if (itemOffset > index + 1) {
                  const selectedCount = selectedPage * itemsPerPage + 1;
                  setPaginationType('backward');
                  setItemFrom(`${selectedCount}`);
                }
              }}
            >
              {index + 1}
            </li>
          ))}
        <div
          className={`cursor-pointer p-3 ${
            itemOffset === paginationCount.length ? 'cursor-not-allowed text-gray-400' : 'rounded-full border border-sky-400'
          }`}
          onClick={() => {
            if (itemOffset + 1 <= paginationCount.length) {
              itemOffset += 1;
              setPaginationType('forward');
              const lastItem: ISellerGig = gigs[gigs.length - 1];
              setItemFrom(`${lastItem.sortId}`);
            }
          }}
        >
          <FaArrowRight className="flex self-center" color={`${itemOffset === paginationCount.length ? 'grey' : 'black'}`} />
        </div>
      </ul>
    </div>
  );
};

export default GigPaginate;
