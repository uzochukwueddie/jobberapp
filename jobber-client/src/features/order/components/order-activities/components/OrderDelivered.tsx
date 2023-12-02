import { AxiosResponse } from 'axios';
import { forwardRef, ForwardRefExoticComponent, RefAttributes, useContext, useState } from 'react';
import { FaCheck, FaChevronDown, FaChevronUp, FaDownload, FaGift } from 'react-icons/fa';
import ChatBox from 'src/features/chat/components/chatbox/ChatBox';
import { IChatBuyerProps, IChatSellerProps } from 'src/features/chat/interfaces/chat.interface';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { IDeliveredWork, IOrderDeliveredModal, IOrderDeliveredProps, IOrderMessage } from 'src/features/order/interfaces/order.interface';
import { useApproveOrderMutation } from 'src/features/order/services/order.service';
import Button from 'src/shared/button/Button';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modals/interfaces/modal.interface';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { bytesToSize, downloadFile, getFileBlob, showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

const OrderDelivered: ForwardRefExoticComponent<Omit<IOrderDeliveredProps, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef(
  (_, ref) => {
    const { order, authUser, viewDeliveryBtnClicked } = useContext(OrderContext);
    const [orderDeliveredModal, setOrderDeliveredModal] = useState<IOrderDeliveredModal>({
      delivery: viewDeliveryBtnClicked as boolean,
      deliveryApproval: false
    });
    const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
    const [showChatBox, setShowChatBox] = useState<boolean>(false);
    const [approveOrder] = useApproveOrderMutation();
    const chatSeller: IChatSellerProps = {
      username: `${order?.sellerUsername}`,
      _id: `${order?.sellerId}`,
      profilePicture: `${order?.sellerImage}`,
      responseTime: 1
    };
    const chatBuyer: IChatBuyerProps = {
      username: `${order?.buyerUsername}`,
      _id: `${order?.buyerId}`,
      profilePicture: `${order?.buyerImage}`
    };

    const onDeliveryApprovalHandler = async (): Promise<void> => {
      try {
        const orderMessage: IOrderMessage = {
          sellerId: `${order?.sellerId}`,
          buyerId: `${order?.buyerId}`,
          ongoingJobs: -1,
          completedJobs: 1,
          // seller will receiver 80% of original price
          // 20% goes to the platform
          totalEarnings: 0.8 * parseInt(`${order?.price}`),
          purchasedGigs: `${order?.gigId}`
        };
        await approveOrder({ orderId: `${order?.orderId}`, body: orderMessage });
        setOrderDeliveredModal({ ...orderDeliveredModal, deliveryApproval: false });
        showSuccessToast('Gig approval successful.');
      } catch (error) {
        showErrorToast('Error approving gig delivery.');
      }
    };

    const downloadOrderFile = async (url: string, fileName: string) => {
      try {
        const response: AxiosResponse = await getFileBlob(url);
        const blobUrl = URL.createObjectURL(new Blob([response.data]));
        downloadFile(blobUrl, fileName);
      } catch (error) {
        showErrorToast('Error downloading file.');
      }
    };

    return (
      <>
        {orderDeliveredModal.deliveryApproval && (
          <ApprovalModal
            approvalModalContent={approvalModalContent}
            onClose={() => setOrderDeliveredModal({ ...orderDeliveredModal, deliveryApproval: false })}
            onClick={onDeliveryApprovalHandler}
          />
        )}
        {order?.delivered && order?.deliveredWork && order?.deliveredWork.length > 0 && (
          <div className="flex rounded-[4px] bg-white px-4 py-3">
            <div className="w-full">
              <div className="flex gap-4">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc5c5]">
                    <FaGift size={18} color="#ed3939" />
                  </div>
                </div>
                <div className="border-grey w-full cursor-pointer border-b pb-5" ref={ref}>
                  <div className="mt-2 flex items-center justify-between font-medium text-gray-500">
                    <div className="flex gap-2">
                      <span>
                        {order.buyerUsername === authUser?.username ? order.sellerUsername : 'You'} delivered{' '}
                        {order.buyerUsername === authUser?.username ? 'your' : 'the'} order
                      </span>
                      <p className="flex self-center text-sm font-normal italic">
                        {TimeAgo.dayWithTime(`${order?.events.orderDelivered}`)}
                      </p>
                    </div>
                    <div onClick={() => setOrderDeliveredModal({ ...orderDeliveredModal, delivery: !orderDeliveredModal.delivery })}>
                      {!orderDeliveredModal.delivery ? <FaChevronDown size={15} /> : <FaChevronUp size={15} />}
                    </div>
                  </div>
                  {orderDeliveredModal.delivery && (
                    <div className="my-3 flex flex-col">
                      <div className="relative overflow-x-auto">
                        <div className="border-grey w-full rounded  border text-left text-sm text-gray-500">
                          <div className="border-grey border-b bg-[#fafafb] py-3 font-medium uppercase">
                            <span className="px-5">Deliver{order?.deliveredWork.length > 1 ? 'ies' : 'y'}</span>
                          </div>
                          {order.deliveredWork.map((work: IDeliveredWork) => (
                            <div
                              key={uuidv4()}
                              className="border-grey flex w-full cursor-pointer flex-col items-center space-x-4 border-b px-5 pt-2 last:border-none md:flex-row"
                            >
                              <div className="flex w-full justify-center md:w-12 md:self-start">
                                <img className="h-10 w-10 rounded-full object-cover" src={order.sellerImage} alt="Seller Image" />
                              </div>
                              <div className="w-full text-sm dark:text-white">
                                <div className="flex justify-between text-sm font-bold text-[#777d74] md:text-base">
                                  <span>{authUser?.username === order.buyerUsername ? `${order.sellerUsername}'s message` : 'Me'}</span>
                                </div>
                                <div className="flex flex-col justify-between text-[#777d74]">
                                  <span className="text-sm md:text-[15px]">{work.message}</span>
                                  <div className="mt-3 flex flex-col">
                                    <div className="mb-5 text-sm font-bold uppercase">Attachments</div>
                                    <div
                                      onClick={() => downloadOrderFile(work.file, work.fileName)}
                                      className="border-grey relative mb-5 flex max-w-[250px] cursor-pointer items-center justify-between rounded-md border py-3 text-xs font-bold"
                                    >
                                      <div className="absolute h-full rounded-l border-l-8 border-[#4aa1f3]"></div>
                                      <span className="ml-4 w-[50%] truncate whitespace-nowrap">{work.fileName}</span>
                                      <p className="mr-1">({bytesToSize(work.fileSize)})</p>{' '}
                                      <FaDownload size={15} color="#4aa1f3" className="mr-4" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {order?.delivered && order?.deliveredWork && order?.deliveredWork.length > 0 && (
          <div className="flex rounded-[4px] bg-white px-4 py-1">
            <div className="w-full">
              <div className="flex gap-4">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4befa]">
                    <FaCheck size={18} color="#e439f7" />
                  </div>
                </div>
                <div className="border-grey w-full cursor-pointer border-b pb-6">
                  <div className="mt-2 flex items-center gap-2 font-medium text-gray-500">
                    <span>{order.approved && `${authUser?.username === order.buyerUsername ? 'Your' : 'The'} order was completed`}</span>
                    {!order.approved && authUser?.username === order.buyerUsername && <span>Are you ready to approve the delivery?</span>}
                    {!order.approved && authUser?.username !== order.buyerUsername && (
                      <span className="italic">Waiting for order to be approved.</span>
                    )}
                    {order.approved && <p className="text-sm font-normal italic">{TimeAgo.dayWithTime(`${order?.approvedAt}`)}</p>}
                  </div>
                  {!order.approved && authUser?.username === order.buyerUsername && (
                    <div className="my-3 flex flex-col">
                      <div className="relative overflow-x-auto">
                        <div className="text-left text-sm text-gray-500">
                          <div className="border-grey flex w-full cursor-pointer flex-col items-center space-x-4 border-b md:flex-row">
                            <div className="w-full text-sm dark:text-white">
                              <div className="flex flex-col justify-between text-[#777d74]">
                                <span className="text-sm md:text-[15px]">
                                  If you have any issue to discuss with the seller before approving, you can go to
                                  <a onClick={() => setShowChatBox(!showChatBox)} className="px-1 text-blue-500 hover:underline" href="#">
                                    Go to Inbox
                                  </a>
                                  to contact the seller.
                                </span>
                                <div className="mt-3 flex pb-6">
                                  <Button
                                    className="rounded bg-green-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-green-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                                    onClick={() => {
                                      setApprovalModalContent({
                                        header: 'Approve Final Delivery',
                                        body: 'Got everything you need? Great! Once you approve the delivery, your work will be marked as complete.',
                                        btnText: 'Approve Final Delivery',
                                        btnColor: 'bg-sky-500 hover:bg-sky-400'
                                      });
                                      setOrderDeliveredModal({ ...orderDeliveredModal, deliveryApproval: true });
                                    }}
                                    label="Yes, Approve delivery"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {showChatBox && <ChatBox seller={chatSeller} buyer={chatBuyer} gigId={`${order?.gigId}`} onClose={() => setShowChatBox(false)} />}
      </>
    );
  }
);

export default OrderDelivered;
