import { FC, ReactElement } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Button from 'src/shared/button/Button';

const Error: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-6xl font-bold text-sky-500 md:text-8xl lg:text-9xl">Oops!</div>
      <p className="mt-5 text-base font-bold text-sky-500 md:text-xl lg:text-2xl">Error 404: Page Not Found</p>
      <Button
        onClick={() => navigate(-1)}
        disabled={false}
        className="mt-5 rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
        label="Back Home"
      />
    </div>
  );
};

export default Error;
