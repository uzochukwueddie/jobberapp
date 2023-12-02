import { FC, ReactElement } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

import { IBannerProps } from '../shared.interface';

const Banner: FC<IBannerProps> = ({ bgColor, text, showLink, linkText, onClick }): ReactElement => {
  return (
    <div className={`left-0 top-0 z-50 flex w-full justify-between p-4 ${bgColor}`}>
      <div className="mx-auto flex items-center">
        <div className="flex items-center text-sm font-bold text-white">
          <span className="mr-1 inline-flex rounded-full p-1">
            <FaExclamationTriangle className="h-4 w-4 text-white" />
          </span>
          <span className="flex gap-2">
            {text}
            {showLink && (
              <div onClick={onClick} className="cursor-pointer inline font-medium text-blue-500 no-underline hover:underline">
                {linkText}
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
