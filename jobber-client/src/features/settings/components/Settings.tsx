import { FC, ReactElement } from 'react';

import ChangePassword from './ChangePassword';

const Settings: FC = (): ReactElement => {
  return (
    <div className="mx-auto px-6 flex items-center flex-col container">
      <div className="w-[50%] bg-white px-6 pt-5 pb-7 mt-6">
        <ChangePassword />
      </div>
    </div>
  );
};

export default Settings;
