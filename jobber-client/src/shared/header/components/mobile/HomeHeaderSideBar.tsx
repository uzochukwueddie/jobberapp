import { Transition } from '@headlessui/react';
import { FC, MouseEvent, ReactElement, useState } from 'react';
import { FaAngleDown, FaAngleRight, FaAngleUp } from 'react-icons/fa';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { applicationLogout, categories, lowerCase, replaceSpacesWithDash } from 'src/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

import { IHeaderSideBarProps, ISettings } from '../../interfaces/header.interface';
import { updateCategoryContainer } from '../../reducers/category.reducer';
import { updateHeader } from '../../reducers/header.reducer';

const HomeHeaderSideBar: FC<IHeaderSideBarProps> = ({ setOpenSidebar }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const buyer = useAppSelector((state: IReduxState) => state.buyer);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [toggleCategories, setToggleCategories] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const isSeller: boolean = (buyer && buyer.isSeller) as boolean;
  const settings: ISettings[] = [
    { id: 1, name: 'Add a new gig', url: `/manage_gigs/new/${seller?._id}`, show: isSeller },
    { id: 2, name: 'Dashboard', url: `/users/${buyer?.username}/${buyer?._id}/orders`, show: true },
    { id: 3, name: 'Profile', url: `/seller_profile/${lowerCase(`${seller?.username}`)}/${seller?._id}/edit`, show: isSeller },
    { id: 4, name: 'Settings', url: `/${lowerCase(`${seller?.username}`)}/edit`, show: true }
  ];

  const toggleDropdown = (event: MouseEvent): void => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCategoriesDropdown = (event: MouseEvent): void => {
    event.stopPropagation();
    setToggleCategories(!toggleCategories);
  };

  const onLogout = (): void => {
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
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(true));
              }
            }}
            className="cursor-pointer text-base font-medium text-gray-400"
          >
            <Link to="/">Home</Link>
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
            <Link to="/inbox">Inbox</Link>
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
            <Link to={`/users/${lowerCase(`${buyer?.username}`)}/${buyer?._id}/orders`}>Orders</Link>
          </div>
          {!isSeller && (
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
              <Link to="/seller_onboarding">Become a Seller</Link>
            </div>
          )}
          {isSeller && (
            <div
              onClick={(event: MouseEvent) => {
                event.stopPropagation();
                if (setOpenSidebar) {
                  setOpenSidebar(false);
                  dispatch(updateHeader('sellerDashboard'));
                  dispatch(updateCategoryContainer(true));
                }
              }}
              className="cursor-pointer text-base font-medium text-gray-400"
            >
              <Link to={`/${lowerCase(`${authUser?.username}`)}/${seller?._id}/seller_dashboard`}>
                <span>Switch to Selling</span>
              </Link>
            </div>
          )}
          <div className="flex w-full cursor-pointer flex-col text-base font-medium text-gray-400">
            <span className="flex justify-between" onClick={toggleCategoriesDropdown}>
              Browse Categories{' '}
              {!toggleCategories ? <FaAngleDown className="mt-1 flex self-center" /> : <FaAngleUp className="mt-1 flex self-center" />}
            </span>
            <div className="">
              <Transition
                show={toggleCategories}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <ul>
                  {categories().map((category: string) => (
                    <li
                      key={uuidv4()}
                      className="flex cursor-pointer justify-between py-2 text-right hover:text-sky-400"
                      onClick={() => {
                        if (setOpenSidebar) {
                          setOpenSidebar(false);
                          dispatch(updateHeader('home'));
                          dispatch(updateCategoryContainer(true));
                        }
                      }}
                    >
                      <span className="w-full pr-6">
                        <Link
                          to={`/categories/${replaceSpacesWithDash(category)}`}
                          onClick={() => {
                            socket.emit('getLoggedInUsers', '');
                          }}
                        >
                          {category}
                        </Link>
                      </span>{' '}
                      <FaAngleRight className="flex self-center" />
                    </li>
                  ))}
                </ul>
              </Transition>
            </div>
          </div>
          <div className="flex w-full cursor-pointer flex-col text-base font-medium text-gray-400">
            <span className="flex justify-between" onClick={toggleDropdown}>
              Your Settings{' '}
              {!isDropdownOpen ? <FaAngleDown className="mt-1 flex self-center" /> : <FaAngleUp className="mt-1 flex self-center" />}
            </span>
            <div className="">
              <Transition
                show={isDropdownOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <ul>
                  {settings.map((setting: ISettings) => (
                    <div key={uuidv4()}>
                      {setting.show && (
                        <li className="cursor-pointer  py-2 hover:text-sky-400">
                          <Link
                            to={`${setting.url}`}
                            className="flex justify-between text-right"
                            onClick={() => {
                              dispatch(updateCategoryContainer(setting.name !== 'Settings'));
                            }}
                          >
                            <span className="w-full pr-6">{setting.name}</span> <FaAngleRight className="flex self-center" />
                          </Link>
                        </li>
                      )}
                    </div>
                  ))}
                </ul>
              </Transition>
            </div>
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

export default HomeHeaderSideBar;
