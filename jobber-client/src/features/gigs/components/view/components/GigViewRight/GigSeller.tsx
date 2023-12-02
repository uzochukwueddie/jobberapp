import { FC, ReactElement, useContext, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ChatBox from 'src/features/chat/components/chatbox/ChatBox';
import { IChatBuyerProps, IChatSellerProps } from 'src/features/chat/interfaces/chat.interface';
import { GigContext } from 'src/features/gigs/context/GigContext';
import { ILanguage } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modals/interfaces/modal.interface';
import StarRating from 'src/shared/rating/StarRating';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { lowerCase, rating, shortenLargeNumbers } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

const GigSeller: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const buyer = useAppSelector((state: IReduxState) => state.buyer);
  const { gig, seller } = useContext(GigContext);
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const chatSeller: IChatSellerProps = {
    username: `${seller.username}`,
    _id: `${seller._id}`,
    profilePicture: `${seller.profilePicture}`,
    responseTime: parseInt(`${seller.responseTime}`)
  };
  const chatBuyer: IChatBuyerProps = {
    username: `${buyer.username}`,
    _id: `${buyer._id}`,
    profilePicture: `${buyer.profilePicture}`
  };

  return (
    <>
      {showModal && <ApprovalModal approvalModalContent={approvalModalContent} hideCancel={true} onClick={() => setShowModal(false)} />}
      <div className="border-grey mb-8 border">
        <div className="flex border-b px-4 py-2">
          <h4 className="font-bold">About The Seller</h4>
        </div>
        <div className="mb-0 px-4 pt-2">
          <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-2">
            <img className="flex h-24 w-24 self-center rounded-full object-cover" src={gig.profilePicture} alt="" />
            <div className="flex flex-col self-center">
              <Link
                to={`/seller_profile/${lowerCase(`${gig.username}`)}/${gig.sellerId}/view`}
                className="flex cursor-pointer self-center no-underline hover:underline md:block md:self-start"
              >
                <span className="text-base font-bold md:mb-5">{gig.username}</span>
              </Link>
              <span className="flex self-center text-sm md:block md:self-start">{seller.oneliner}</span>
              <div className="flex w-full justify-center pt-1 md:justify-start">
                <div className={`flex w-full justify-center md:justify-start ${seller.ratingsCount === 0 ? 'gap-x-[5.8rem]' : 'gap-x-5'}`}>
                  <div className="flex w-full justify-center gap-x-1 md:justify-start">
                    <div className="mt-1 w-20 gap-x-2">
                      <StarRating value={rating(parseInt(`${gig.ratingSum}`) / parseInt(`${gig.ratingsCount}`))} size={14} />
                    </div>
                    <div className="ml-2 mt-[1px] flex gap-1 text-sm">
                      <span className="">({shortenLargeNumbers(gig?.ratingsCount)})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-grey my-3" />
          <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
            <div className="flex flex-col">
              <span className="">From</span>
              <span className="font-bold">{seller.country}</span>
            </div>
            <div className="flex flex-col">
              <span className="">Member since</span>
              <span className="font-bold">{TimeAgo.formatDateToMonthAndYear(`${seller.createdAt}`)}</span>
            </div>
            <div className="flex flex-col">
              <span className="">Avg. resp time</span>
              <span className="font-bold">
                {seller.responseTime} hour{`${seller.responseTime > 1 ? 's' : ''}`}{' '}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="">Languages</span>
              <div className="flex flex-wrap">
                {seller?.languages &&
                  seller?.languages.map((language: ILanguage, index: number) => (
                    <span className="font-bold" key={uuidv4()}>
                      {`${language.language}${index !== seller.languages.length - 1 ? ',' : ''}`}&nbsp;
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <hr className="border-grey my-2" />
          <div className="ml-15 mb-2 flex w-full py-1">
            <Button
              disabled={authUser.username === gig.username}
              className={`text-md flex w-full justify-between rounded bg-sky-500 px-8 py-2 font-bold text-white focus:outline-none
              ${authUser.username === gig.username ? 'opacity-20 cursor-not-allowed' : 'hover:bg-sky-400 cursor-pointer'}
              `}
              label={
                <>
                  <span className="w-full">Contact Me</span>
                  <FaArrowRight className="flex self-center" />
                </>
              }
              onClick={() => {
                if (authUser && !authUser.emailVerified) {
                  setApprovalModalContent({
                    header: 'Email Verification Notice',
                    body: 'Please verify your email before you continue.',
                    btnText: 'OK',
                    btnColor: 'bg-sky-500 hover:bg-sky-400'
                  });
                  setShowModal(true);
                } else {
                  setShowChatBox((item: boolean) => !item);
                }
              }}
            />
          </div>
        </div>
        {showChatBox && <ChatBox seller={chatSeller} buyer={chatBuyer} gigId={`${gig.id}`} onClose={() => setShowChatBox(false)} />}
      </div>
    </>
  );
};

export default GigSeller;
