import { FC, ReactElement, Suspense, useRef, useState } from 'react';
import { FaArrowRight, FaCircleNotch, FaRegClock } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import RegisterModal from 'src/features/auth/components/Register';
import { useGetAuthGigByIdQuery } from 'src/features/auth/services/auth.service';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import Button from 'src/shared/button/Button';
import Header from 'src/shared/header/components/Header';
import HtmlParser from 'src/shared/html-parser/HtmlParser';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import StarRating from 'src/shared/rating/StarRating';
import { emptyGigData } from 'src/shared/utils/static-data';
import { rating, shortenLargeNumbers } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

const GigInfoDisplay: FC = (): ReactElement => {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const { gigId } = useParams<string>();
  const { data, isSuccess, isLoading } = useGetAuthGigByIdQuery(`${gigId}`);
  const gig = useRef<ISellerGig>(emptyGigData);
  if (isSuccess) {
    gig.current = data.gig as ISellerGig;
  }

  return (
    <>
      {showRegisterModal && (
        <Suspense>
          <RegisterModal
            onClose={() => setShowRegisterModal(false)}
            onToggle={() => {
              setShowRegisterModal(false);
            }}
          />
        </Suspense>
      )}
      <div className="flex w-screen flex-col">
        <Header navClass="navbar peer-checked:navbar-active relative z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
        {isLoading ? (
          <CircularPageLoader />
        ) : (
          <div className="relative m-auto mt-8 min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
            <main className="max-w-8xl container mx-auto mt-8">
              <h2 className="mb-4 px-4 text-xl font-bold text-[#404145] lg:text-3xl">{gig.current.title}</h2>
              <div className="mb-4 flex flex-row gap-x-2 px-4">
                <img className="flex h-8 w-8 self-center rounded-full object-cover" src={gig.current.profilePicture} alt="" />
                <span className="flex self-center font-extrabold">{gig.current.username}</span>
                {gig.current.ratingSum && gig.current.ratingsCount && gig.current.ratingSum >= 1 && gig.current.ratingsCount >= 1 ? (
                  <>
                    <span className="flex self-center">|</span>
                    <div className="flex w-full gap-x-1 self-center">
                      <div className="mt-1 w-20 gap-x-2">
                        <StarRating value={rating(gig.current.ratingSum / gig.current.ratingsCount)} size={14} />
                      </div>
                      <div className="ml-2 mt-[2px] flex gap-1 text-sm">
                        <span className="text-orange-400">{rating(gig.current.ratingSum / gig.current.ratingsCount)}</span>
                        <span className="">({shortenLargeNumbers(gig.current.ratingsCount)})</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-wrap">
                <div className="order-last flex w-full flex-col p-4 lg:order-first lg:w-2/3">
                  <div className="relative flex max-h-[600px] cursor-pointer justify-center bg-[#F5F5F5]">
                    {!isLoading && isSuccess && (
                      <img
                        src={gig.current.coverImage}
                        alt="Gig Image"
                        className="object-contains h-full w-full transition-all duration-500 hover:scale-105"
                      />
                    )}
                    {isLoading && !isSuccess && (
                      <div className="object-contains flex h-[600px] w-full transition-all duration-500 hover:scale-105">
                        <FaCircleNotch className="animate-spin h-10 w-full mr-3 flex self-center" size={40} color="#50b5ff" />
                      </div>
                    )}
                  </div>
                  <div className="mt-10 pb-6 text-lg font-semibold">About This Gig</div>
                  <div className="pb-6">
                    <HtmlParser input={gig.current.description ?? ''} />
                  </div>
                  <hr className="border-grey my-3" />
                  <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
                    <div className="flex flex-col">
                      <span className="text-[#95979d]">Main Categories</span>
                      <span className="font-normal">{gig.current.categories}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#95979d]">Sub Categories</span>
                      <div className="flex flex-col">
                        {gig.current.subCategories &&
                          gig.current.subCategories.map((category: string, index: number) => (
                            <span className="font-normal" key={uuidv4()}>{`${category}${
                              index !== gig.current.subCategories.length - 1 ? ',' : ''
                            }`}</span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <hr className="border-grey my-3" />
                </div>

                <div className="w-full p-4 lg:w-1/3">
                  <StickyBox>
                    <div className="border-grey mb-8 border">
                      <div className="flex border-b px-4 py-2">
                        <h4 className="font-bold">${gig.current.price}</h4>
                      </div>
                      <ul className="mb-0 list-none px-4 py-2">
                        <li className="flex justify-between">
                          <div className="ml-15 flex w-full pb-3">
                            <div className="text-base font-bold">{gig.current.basicTitle}</div>
                          </div>
                        </li>
                        <li className="flex justify-between">
                          <div className="ml-15 flex w-full pb-4">
                            <div className="text-sm font-normal">{gig.current.basicDescription}</div>
                          </div>
                        </li>
                        <li className="flex justify-between">
                          <div className="ml-15 flex w-full pb-3">
                            <FaRegClock className="flex self-center" />{' '}
                            <span className="ml-3 text-sm font-semibold">{gig.current.expectedDelivery}</span>
                          </div>
                        </li>
                        <li className="flex justify-between">
                          <div className="ml-15 flex w-full py-1">
                            <Button
                              className={
                                'text-md flex w-full cursor-pointer justify-between rounded bg-sky-500 px-8 py-2 font-bold text-white focus:outline-none '
                              }
                              onClick={() => setShowRegisterModal(true)}
                              label={
                                <>
                                  <span className="w-full">Continue</span> <FaArrowRight className="flex self-center" />
                                </>
                              }
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </StickyBox>
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    </>
  );
};

export default GigInfoDisplay;
