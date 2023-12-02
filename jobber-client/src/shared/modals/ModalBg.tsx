import { FC, ReactElement } from 'react';

import { IModalBgProps } from './interfaces/modal.interface';

const ModalBg: FC<IModalBgProps> = ({ children }): ReactElement => {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 h-full w-full z-50 overflow-hidden">
      <div className="py-2 z-10 absolute top-0 right-0 left-0 bottom-0 bg-black/[.65]">{children}</div>
    </div>
  );
};

export default ModalBg;
