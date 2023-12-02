import { FC, ReactElement } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import Button from '../button/Button';
import { IPageMessageProps } from '../shared.interface';

const PageMessage: FC<IPageMessageProps> = ({ header, body }): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="flex justify-center items-center h-full flex-col">
      <h1 className="font-extrabold text-xl md:text-2xl lg:text-4xl text-center">{header}</h1>
      <p className="text-base mt-4 md:text-lg text-center w-1/3">{body}</p>
      <Button
        onClick={() => navigate('/')}
        disabled={false}
        className="mt-5 rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
        label="Go Back"
      />
    </div>
  );
};

export default PageMessage;
