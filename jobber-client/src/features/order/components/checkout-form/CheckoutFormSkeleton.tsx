import { FC, ReactElement } from 'react';

const CheckoutFormSkeleton: FC = (): ReactElement => {
  return (
    <div className="pb-4 px-4">
      <div className="w-full animate-pulse">
        <div className="flex space-x-3">
          <div className="h-10 w-[60%] rounded bg-gray-200"></div>
          <div className="h-10 w-[20%] rounded bg-gray-200"></div>
          <div className="h-10 w-[20%] rounded bg-gray-200"></div>
        </div>
        <div className="flex mt-6">
          <div className="h-10 w-full rounded bg-gray-200"></div>
        </div>
        <div className="flex mt-8">
          <div className="h-10 w-full rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFormSkeleton;
