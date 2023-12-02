import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Alert from 'src/shared/alert/Alert';
import { IResponse } from 'src/shared/shared.interface';
import { useAppDispatch } from 'src/store/store';

import { AUTH_FETCH_STATUS } from '../interfaces/auth.interface';
import { addAuthUser } from '../reducers/auth.reducer';
import { useVerifyEmailMutation } from '../services/auth.service';

const ConfirmEmail: FC = (): ReactElement => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [status, setStatus] = useState<string>(AUTH_FETCH_STATUS.IDLE);
  const [searchParams] = useSearchParams({});
  const dispatch = useAppDispatch();
  const [verifyEmail] = useVerifyEmailMutation();

  const onVerifyEmail = useCallback(async (): Promise<void> => {
    try {
      const result: IResponse = await verifyEmail(`${searchParams.get('v_token')}`).unwrap();
      setAlertMessage('Email verified successfully.');
      setStatus(AUTH_FETCH_STATUS.SUCCESS);
      dispatch(addAuthUser({ authInfo: result.user }));
    } catch (error) {
      setStatus(AUTH_FETCH_STATUS.ERROR);
      setAlertMessage(error?.data.message);
    }
  }, [dispatch, searchParams, verifyEmail]);

  useEffect(() => {
    onVerifyEmail();
  }, [onVerifyEmail]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-6 py-8 mt-20 lg:py-0">
      <div className="w-[30%]">
        <Alert type={status} message={alertMessage} />
      </div>
      <Link
        to="/"
        className="rounded bg-sky-500 px-6 py-3 mt-5 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
      >
        Continue to Home
      </Link>
    </div>
  );
};

export default ConfirmEmail;
