import { FC, ReactElement } from 'react';

import { IAlertProps, IAlertTypes } from '../shared.interface';

const Alert: FC<IAlertProps> = ({ type, message }): ReactElement => {
  const alerts: IAlertTypes = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700'
  };

  return (
    <div className={`flex w-full mb-4 p-4 text-sm ${alerts[`${type}`]}`} role="alert">
      <svg className="mr-3 inline h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div>{message}</div>
    </div>
  );
};

export default Alert;
