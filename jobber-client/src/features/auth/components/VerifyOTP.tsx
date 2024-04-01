import { Action } from '@reduxjs/toolkit';
import { ChangeEvent, FC, lazy, LazyExoticComponent, ReactElement, useState } from 'react';
import { useDeviceData, useMobileOrientation } from 'react-device-detect';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { addBuyer } from 'src/features/buyer/reducers/buyer.reducer';
import { buyerApi } from 'src/features/buyer/services/buyer.service';
import Home from 'src/features/home/components/Home';
import { addSeller } from 'src/features/sellers/reducers/seller.reducer';
import { sellerApi } from 'src/features/sellers/services/seller.service';
import Button from 'src/shared/button/Button';
import HomeHeader from 'src/shared/header/components/HomeHeader';
import { IHeader } from 'src/shared/header/interfaces/header.interface';
import { updateCategoryContainer } from 'src/shared/header/reducers/category.reducer';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import TextInput from 'src/shared/inputs/TextInput';
import { IResponse } from 'src/shared/shared.interface';
import { saveToSessionStorage, showErrorToast } from 'src/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { addAuthUser } from '../reducers/auth.reducer';
import { updateLogout } from '../reducers/logout.reducer';
import { useVerifyOTPMutation } from '../services/auth.service';

const IndexHeader: LazyExoticComponent<FC<IHeader>> = lazy(() => import('src/shared/header/components/Header'));

const VerifyOTP: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer);
  const mobileOrientation = useMobileOrientation();
  const deviceData = useDeviceData(window.navigator.userAgent);
  const [otp, setOTP] = useState<string>('');
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const onVerifyOTP = async (): Promise<void> => {
    try {
      const data = {
        otp,
        browserName: deviceData.browser.name,
        deviceType: mobileOrientation.isLandscape ? 'browser' : 'mobile'
      };
      const result: IResponse = await verifyOTP(data).unwrap();
      dispatch(addAuthUser({ authInfo: result.user }));
      const buyerResponse = await dispatch(buyerApi.endpoints.getCurrentBuyerByUsername.initiate() as unknown as Action);
      dispatch(addBuyer(buyerResponse.data?.buyer));
      const sellerResponse = await dispatch(
        sellerApi.endpoints.getSellerByUsername.initiate(`${result.user?.username}`) as unknown as Action
      );
      dispatch(addSeller(sellerResponse.data?.seller));
      dispatch(updateLogout(false));
      dispatch(updateHeader('home'));
      dispatch(updateCategoryContainer(true));
      saveToSessionStorage(JSON.stringify(true), JSON.stringify(result.user?.username));
      socket.emit('loggedInUsers', `${result?.user?.username}`);
      setHasLoaded(true);
      navigate('/');
    } catch (error) {
      setHasLoaded(false);
      showErrorToast(error?.data?.message ?? 'Error verifying OTP');
    }
  };

  const renderVerifyOTP = () => {
    return (
      <>
        <IndexHeader navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
        <div className="container mx-auto flex flex-col items-center justify-center px-6 py-8 mt-32 lg:py-0">
          <div className="md:w-[30%] font-bold border-b pb-2 sm:w-[60%]">Authentication</div>
          <div className="md:w-[30%] flex flex-col justify-center sm:w-[60%]">
            <span className="flex self-center rounded-full w-10 h-10 shrink-0 grow-0 p-3 m-5 border border-gray-300">
              <FaEnvelope />
            </span>
            <p className="text-center mb-3">
              Check your inbox, we've sent you a code which expires in <span className="font-bold">10 minutes</span>.
            </p>
            <div className="relative mb-3">
              <div className="absolute left-0 flex h-full cursor-pointer items-center pl-3 text-gray-600">
                <FaLock />
              </div>
              <TextInput
                id="otp"
                name="otp"
                type="number"
                value={otp}
                className="flex h-10 w-full pl-9 items-center rounded border border-gray-300 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                placeholder="6-Digit Code"
                onChange={(event: ChangeEvent) => {
                  setOTP((event.target as HTMLInputElement).value);
                }}
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <Button
                disabled={!otp}
                className={`text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none ${
                  !otp ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                label={`${isLoading ? 'VERIFICATION IN PROGRESS...' : 'VERIFY'}`}
                onClick={onVerifyOTP}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  if (authUser) {
    return !hasLoaded && !authUser.id ? (
      renderVerifyOTP()
    ) : (
      <>
        <HomeHeader showCategoryContainer={showCategoryContainer} />
        <Home />
      </>
    );
  } else {
    return renderVerifyOTP();
  }
};

export default VerifyOTP;
