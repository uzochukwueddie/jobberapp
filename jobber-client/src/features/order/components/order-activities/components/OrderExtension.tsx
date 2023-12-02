/* eslint-disable prettier/prettier */
import { FC, ReactElement, useContext, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { IExtendedDelivery } from 'src/features/order/interfaces/order.interface';
import { useUpdateDeliveryDateMutation } from 'src/features/order/services/order.service';
import Button from 'src/shared/button/Button';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modals/interfaces/modal.interface';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { lowerCase, showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';

const OrderExtension: FC = (): ReactElement => {
  const { order, authUser } = useContext(OrderContext);
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const [showExtensionApprovalModal, setShowExtensionApprovalModal] = useState<boolean>(false);
  const [updateDeliveryDate] = useUpdateDeliveryDateMutation();

  const onApproveHandler = async (): Promise<void> => {
    try {
      const extended: IExtendedDelivery = {
        originalDate: `${order?.offer.oldDeliveryDate}`,
        newDate: `${order?.requestExtension?.newDate}`,
        days: parseInt(`${order?.requestExtension?.days}`),
        reason: `${order?.requestExtension?.reason}`,
        deliveryDateUpdate: `${new Date()}`
      };
      await updateDeliveryDate({ orderId: `${order?.orderId}`, type: lowerCase(`${approvalModalContent?.btnText}`), body: extended });
      setShowExtensionApprovalModal(false);
      showSuccessToast(`${approvalModalContent?.header} successful.`);
    } catch (error) {
      showErrorToast(`${approvalModalContent?.header} error.`);
    }
  };

  return (
    <>
      {showExtensionApprovalModal && (
        <ApprovalModal
          approvalModalContent={approvalModalContent}
          hideCancel={false}
          onClose={() => setShowExtensionApprovalModal(false)}
          onClick={onApproveHandler}
        />
      )}
      {order?.requestExtension &&
        order.requestExtension.newDate &&
        TimeAgo.compareDates(order.offer.oldDeliveryDate, order.offer.newDeliveryDate) === 0 && (
          <div className="flex rounded-[4px] bg-white px-4 py-1">
            <div className="w-full">
              <div className="flex gap-4">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fffdcc]">
                    <FaCheck size={18} color="#e8e123" />
                  </div>
                </div>
                <div className="border-grey w-full cursor-pointer border-b pb-6">
                  <div className="flex items-center justify-between font-medium text-gray-500">
                    <div className="items-left mt-2 flex flex-col gap-2 text-gray-500 md:flex-row md:items-center">
                      {order?.buyerUsername === authUser?.username ? (
                        <span className="text-sm font-bold md:text-base">
                          {order.sellerUsername} requested for a delivery date extension
                        </span>
                      ) : (
                        <span className="text-sm font-bold md:text-base">You requested for a delivery date extension</span>
                      )}
                    </div>
                  </div>
                  <div className="border-grey mt-4 flex w-full flex-col rounded border">
                    <div className="mt-2">
                      <div className="px-4 py-1 text-left text-sm text-gray-500">
                        <div className="flex flex-col md:grid md:grid-cols-3">
                          <span className="col-span-1 text-sm font-bold">Original delivery date</span>
                          <p className="col-span-2 text-sm">{TimeAgo.dayMonthYear(order?.requestExtension.originalDate)}</p>
                        </div>
                        <div className="mt-5 flex flex-col md:grid md:grid-cols-3">
                          <span className="col-span-1 text-sm font-bold">New delivery date</span>
                          <p className="col-span-2 text-sm">{TimeAgo.dayMonthYear(order?.requestExtension.newDate)}</p>
                        </div>
                        <div className="mt-5 flex flex-col md:grid md:grid-cols-3">
                          <span className="col-span-1 text-sm font-bold">Reason</span>
                          <p className="col-span-2 text-sm">{order?.requestExtension.reason}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-grey border-b py-1"></div>
                    <div className="flex gap-4 px-3 py-4">
                      {order.buyerUsername === authUser?.username && (
                        <>
                          <Button
                            className="rounded bg-green-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-green-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                            label="Yes, Approve extension"
                            onClick={() => {
                              setApprovalModalContent({
                                header: 'Approve Extension',
                                body: 'Are you sure you want to approve the request for an extension?',
                                btnText: 'Approve',
                                btnColor: 'bg-sky-500 hover:bg-sky-400'
                              });
                              setShowExtensionApprovalModal(true);
                            }}
                          />
                          <Button
                            className="rounded bg-red-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                            label="No, Reject extension"
                            onClick={() => {
                              setApprovalModalContent({
                                header: 'Reject Extension',
                                body: 'Are you sure you don\'t want to reconsider this extension request?',
                                btnText: 'Reject',
                                btnColor: 'bg-red-500 hover:bg-red-400'
                              });
                              setShowExtensionApprovalModal(true);
                            }}
                          />
                        </>
                      )}
                      {order.buyerUsername !== authUser?.username && <span>Waiting for approval for extension.</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {order?.offer.reason && (
        <div className="flex rounded-[4px] bg-white px-4 py-1">
          <div className="w-full">
            <div className="flex gap-4">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fffdcc]">
                  <FaCheck size={18} color="#e8e123" />
                </div>
              </div>
              <div className="border-grey w-full cursor-pointer border-b pb-6">
                <div className="flex items-center justify-between font-medium text-gray-500">
                  <div className="items-left mt-2 flex flex-col gap-2 text-gray-500 md:flex-row md:items-center">
                    {order?.buyerUsername !== authUser?.username ? (
                      <span className="text-sm font-bold md:text-base">{order.buyerUsername} approved delivery date extension request</span>
                    ) : (
                      <span className="text-sm font-bold md:text-base">You approved delivery date extension request</span>
                    )}
                    <p className="text-sm font-normal italic">{TimeAgo.dayWithTime(`${order?.events.deliveryDateUpdate}`)}</p>
                  </div>
                </div>
                <div className="border-grey mt-4 flex w-full flex-col rounded border">
                  <div className="mt-2">
                    <div className="px-4 py-1 text-left text-sm text-gray-500">
                      <div className="flex flex-col md:grid md:grid-cols-3">
                        <span className="col-span-1 text-sm font-bold">Original delivery date</span>
                        <p className="col-span-2 text-sm">{TimeAgo.dayMonthYear(`${order?.offer.oldDeliveryDate}`)}</p>
                      </div>
                      <div className="mt-5 flex flex-col md:grid md:grid-cols-3">
                        <span className="col-span-1 text-sm font-bold">New delivery date</span>
                        <p className="col-span-2 text-sm">{TimeAgo.dayMonthYear(`${order?.offer.newDeliveryDate}`)}</p>
                      </div>
                      <div className="mt-5 flex flex-col md:grid md:grid-cols-3">
                        <span className="col-span-1 text-sm font-bold">Reason</span>
                        <p className="col-span-2 text-sm">{order?.offer.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderExtension;
