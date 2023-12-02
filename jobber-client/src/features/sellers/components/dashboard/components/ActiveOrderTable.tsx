import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { IActiveOrderProps, IOrderDocument } from 'src/features/order/interfaces/order.interface';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { useAppDispatch } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';

const ActiveOrderTable: FC<IActiveOrderProps> = ({ activeOrders }): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center">
      <table className="border-grey flex-no-wrap flex w-full flex-row overflow-hidden border text-sm text-gray-500 sm:inline-table">
        {activeOrders.length > 0 ? (
          <>
            <thead className="border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden">
              {activeOrders.map(() => (
                <tr
                  key={uuidv4()}
                  className="mb-1 flex flex-col flex-nowrap bg-sky-500 text-white sm:mb-0 sm:table-row md:table-row lg:bg-transparent lg:text-black"
                >
                  <th className="p-3 text-center">
                    <span className="block lg:hidden">Item</span>
                  </th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center">Due In</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">
                    <span className="block lg:hidden">View</span>
                  </th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {activeOrders.map((order: IOrderDocument) => (
                <tr
                  key={uuidv4()}
                  className="border-grey mb-2 flex flex-col flex-nowrap border-b bg-white sm:mb-0 sm:table-row lg:border-none"
                >
                  <td className="flex justify-start gap-3 px-3 py-2">
                    <img className="h-6 w-10 object-cover lg:h-8 lg:w-11" src={order.gigCoverImage} alt="" />
                    <div className="flex flex-wrap gap-2 self-center ">
                      <img className="h-6 w-6 rounded-full object-cover lg:h-8 lg:w-8" src={order.buyerImage} alt="" />
                      <span className="flex self-center font-bold">{order.buyerUsername}</span>
                    </div>
                  </td>
                  <td className="p-3 text-left lg:text-center">${order.price}</td>
                  <td className="p-3 text-left lg:text-center">{TimeAgo.dayMonthYear(`${order.offer.newDeliveryDate}`)}</td>
                  <td className="p-3 text-left lg:text-center">
                    <span className="rounded bg-green-500 px-[5px] py-[4px] text-xs font-bold uppercase text-white">In Progress</span>
                  </td>
                  <td className="px-3 py-1 text-left lg:p-3 lg:text-center">
                    <Link
                      to={`/orders/${order.orderId}/activities`}
                      className="text-sky-500 hover:text-sky-500 hover:underline"
                      onClick={() => dispatch(updateHeader('home'))}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td className="w-full px-4 py-2 text-sm">No active orders to show.</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ActiveOrderTable;
