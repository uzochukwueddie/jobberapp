import { FC, ReactElement, useContext } from 'react';
import { FaPencilAlt, FaPlaceOfWorship, FaRegClock, FaRegFile } from 'react-icons/fa';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { TimeAgo } from 'src/shared/utils/timeago.utils';

const OrderPlaced: FC = (): ReactElement => {
  const { order, authUser } = useContext(OrderContext);

  return (
    <div className="flex rounded-[4px] bg-white px-4 py-3">
      <div className="w-full">
        <div className="flex gap-4">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cae4fc]">
              <FaRegFile size={18} color="#389af5" />
            </div>
          </div>
          <div className="w-full cursor-pointer">
            <div className="border-grey mt-2 flex items-center gap-2 border-b pb-6 text-gray-500">
              <span className="text-base font-bold">
                {order?.buyerUsername === authUser?.username ? 'You' : order?.buyerUsername} placed the order
              </span>
              <p className="text-sm font-normal italic">{TimeAgo.dayWithTime(`${order?.events.placeOrder}`)}</p>
            </div>
          </div>
        </div>

        {order?.requirements !== '' && (
          <div className="flex gap-4 pt-4">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cafcfc]">
                <FaPencilAlt size={18} color="#2debeb" />
              </div>
            </div>
            <div className="w-full cursor-pointer border-grey border-b pb-6">
              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <span className="text-base font-bold">
                  {order?.buyerUsername === authUser?.username ? 'You' : order?.buyerUsername} submiited the requirements
                </span>
                <p className="text-sm font-normal italic">{TimeAgo.dayWithTime(`${order?.events.requirements}`)}</p>
              </div>
              <div className="mt-4 flex w-full rounded">
                <div className="mt-2">
                  <div className="px-4s pb-2 text-left text-sm text-gray-500">
                    <div className="flex flex-col">
                      <p className="col-span-2 text-sm">{order?.requirements}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-4 pt-4">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c5fce4]">
              <FaPlaceOfWorship size={18} color="#2deb98" />
            </div>
          </div>
          <div className="w-full cursor-pointer">
            <div className="border-grey mt-2 flex items-center gap-2 border-b pb-6 text-gray-500">
              <span className="text-base font-bold">{order?.buyerUsername === authUser?.username ? 'Your' : 'The'} order started</span>
              <p className="text-sm font-normal italic">{TimeAgo.dayWithTime(`${order?.events.orderStarted}`)}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c5fce4]">
              <FaRegClock size={18} color="#2deb98" />
            </div>
          </div>
          <div className="w-full cursor-pointer">
            <div className="border-grey mt-2 flex items-center gap-2 border-b pb-6 text-gray-500">
              <span className="text-base font-bold">Your delivery date was updated to</span>
              <p className="text-sm font-normal italic">{TimeAgo.dayWithTime(`${order?.offer.newDeliveryDate}`)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
