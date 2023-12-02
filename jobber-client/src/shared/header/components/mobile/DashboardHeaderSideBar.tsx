import { FC, MouseEvent, ReactElement } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { applicationLogout, lowerCase } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { IHeaderSideBarProps } from '../../interfaces/header.interface';
import { updateCategoryContainer } from '../../reducers/category.reducer';
import { updateHeader } from '../../reducers/header.reducer';

const DashboardHeaderSideBar: FC<IHeaderSideBarProps> = ({ setOpenSidebar }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const onLogout = async () => {
    applicationLogout(dispatch, navigate);
  };

  return (
    <div
      className={'fixed left-0 top-0 z-[150] flex h-screen w-full bg-black/40 transition-all duration-500'}
      onClick={() => {
        if (setOpenSidebar) {
          setOpenSidebar(false);
        }
      }}
    >
      <div className={'absolute left-0 top-0 z-20 flex h-screen w-[250px] flex-col items-start justify-start gap-4 bg-white p-6'}>
        <div className="z-2 sticky top-0 flex w-full flex-col items-start justify-start gap-6 bg-white">
          <div className="flex cursor-pointer gap-4 py-3 text-base font-semibold transition-all duration-300">
            <img src={`${authUser?.profilePicture}`} alt="profile" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-blacks flex self-center">{authUser?.username}</span>
          </div>
          <div
            onClick={() => {
              if (setOpenSidebar) {
                setOpenSidebar(false);
                dispatch(updateHeader('sellerDashboard'));
                dispatch(updateCategoryContainer(true));
              }
            }}
            className="cursor-pointer text-base font-medium text-gray-400"
          >
            <Link to={`/${lowerCase(`${seller?.username}`)}/${seller?._id}/seller_dashboard`}>Seller Dashboard</Link>
          </div>
          <div
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              if (setOpenSidebar) {
                setOpenSidebar(false);
              }
            }}
            className="cursor-pointer text-base font-medium text-gray-400"
          >
            <Link to={`/${lowerCase(`${seller?.username}`)}/${seller?._id}/manage_orders`}>Orders</Link>
          </div>
          <div
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              if (setOpenSidebar) {
                setOpenSidebar(false);
              }
            }}
            className="cursor-pointer text-base font-medium text-gray-400"
          >
            <Link to={`/${lowerCase(`${seller?.username}`)}/${seller?._id}/manage_earnings`}>Earnings</Link>
          </div>
          <div
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              if (setOpenSidebar) {
                setOpenSidebar(false);
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(true));
              }
            }}
            className="cursor-pointer text-base font-medium text-gray-400"
          >
            <Link to="/">Switch to Buying</Link>
          </div>
          <div
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              if (setOpenSidebar) {
                setOpenSidebar(false);
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(true));
              }
            }}
            className="cursor-pointer text-base font-medium text-gray-400"
          >
            <Link to={`/${lowerCase(`${seller?.username}`)}/edit`}>Settings</Link>
          </div>
          <div
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              if (setOpenSidebar) {
                setOpenSidebar(false);
                onLogout();
              }
            }}
            className="cursor-pointer text-base font-medium text-gray-400"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeaderSideBar;
