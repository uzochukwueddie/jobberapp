import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import countries, { LocalizedCountryNames } from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { filter } from 'lodash';
import millify from 'millify';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from 'src/features/auth/reducers/logout.reducer';
import { authApi } from 'src/features/auth/services/auth.service';
import { IOrderDocument } from 'src/features/order/interfaces/order.interface';
import { api } from 'src/store/api';

countries.registerLocale(enLocale);

export const lowerCase = (str: string): string => {
  return str.toLowerCase();
};

export const firstLetterUppercase = (str: string): string => {
  const valueString = lowerCase(`${str}`);
  return `${valueString.charAt(0).toUpperCase()}${valueString.slice(1).toLowerCase()}`;
};

export const replaceSpacesWithDash = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/\/| /g, '-'); // replace / and space with -
};

export const replaceDashWithSpaces = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/-|\/| /g, ' '); // replace - / and space with -
};

export const replaceAmpersandWithSpace = (title: string): string => {
  return title.replace(/&/g, '');
};

export const replaceAmpersandAndDashWithSpace = (title: string): string => {
  const titleWithoutDash = replaceDashWithSpaces(title);
  return titleWithoutDash.replace(/&| /g, ' ');
};

export const categories = (): string[] => {
  return [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Photography',
    'Data',
    'Business'
  ];
};

export const expectedGigDelivery = (): string[] => {
  return [
    '1 Day Delivery',
    '2 Days Delivery',
    '3 Days Delivery',
    '4 Days Delivery',
    '5 Days Delivery',
    '6 Days Delivery',
    '7 Days Delivery',
    '10 Days Delivery',
    '14 Days Delivery',
    '21 Days Delivery',
    '30 Days Delivery',
    '45 Days Delivery',
    '60 Days Delivery',
    '75 Days Delivery',
    '90 Days Delivery'
  ];
};

export const countriesList = (): string[] => {
  const countriesObj: LocalizedCountryNames<{ select: 'official' }> = countries.getNames('en', { select: 'official' });
  return Object.values(countriesObj);
};

export const saveToSessionStorage = (data: string, username: string): void => {
  window.sessionStorage.setItem('isLoggedIn', data);
  window.sessionStorage.setItem('loggedInuser', username);
};

export const getDataFromSessionStorage = (key: string) => {
  const data = window.sessionStorage.getItem(key) as string;
  return JSON.parse(data);
};

export const saveToLocalStorage = (key: string, data: string): void => {
  window.localStorage.setItem(key, data);
};

export const getDataFromLocalStorage = (key: string) => {
  const data = window.localStorage.getItem(key) as string;
  return JSON.parse(data);
};

export const deleteFromLocalStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};

export const applicationLogout = (dispatch: Dispatch, navigate: NavigateFunction) => {
  const loggedInUsername: string = getDataFromSessionStorage('loggedInuser');
  dispatch(logout({}));
  if (loggedInUsername) {
    dispatch(authApi.endpoints.removeLoggedInUser.initiate(`${loggedInUsername}`, { track: false }) as never);
  }
  dispatch(api.util.resetApiState());
  dispatch(authApi.endpoints.logout.initiate() as never);
  saveToSessionStorage(JSON.stringify(false), JSON.stringify(''));
  deleteFromLocalStorage('becomeASeller');
  navigate('/');
};

export const isFetchBaseQueryError = (error: unknown): boolean => {
  return typeof error === 'object' && error !== null && 'status' in error && 'data' in error;
};

export const orderTypes = (status: string, orders: IOrderDocument[]): number => {
  const orderList: IOrderDocument[] = filter(orders, (order: IOrderDocument) => lowerCase(order.status) === lowerCase(status));
  return orderList.length;
};

export const sellerOrderList = (status: string, orders: IOrderDocument[]): IOrderDocument[] => {
  const orderList: IOrderDocument[] = filter(orders, (order: IOrderDocument) => lowerCase(order.status) === lowerCase(status));
  return orderList;
};

export const degreeList = (): string[] => {
  return ['Associate', 'B.A.', 'B.Sc.', 'M.A.', 'M.B.A.', 'M.Sc.', 'J.D.', 'M.D.', 'Ph.D.', 'LLB', 'Certificate', 'Other'];
};

export const languageLevel = (): string[] => {
  return ['Basic', 'Conversational', 'Fluent', 'Native'];
};

export const yearsList = (maxOffset: number): string[] => {
  const years: string[] = [];
  const currentYear: number = new Date().getFullYear();
  for (let i = 0; i <= maxOffset; i++) {
    const year: number = currentYear - i;
    years.push(`${year}`);
  }
  return years;
};

export const shortenLargeNumbers = (data: number | undefined): string => {
  if (data === undefined) {
    return '0';
  }
  return millify(data, { precision: 0 });
};

export const rating = (num: number): number => {
  if (num) {
    return Math.round(num * 10) / 10;
  }
  return 0.0;
};

export const showSuccessToast = (message: string): void => {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored'
  });
};

export const showErrorToast = (message: string): void => {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored'
  });
};

export const reactQuillUtils = () => {
  const modules = {
    toolbar: [
      ['bold', 'italic'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  };
  const formats: string[] = ['bold', 'italic', 'list', 'bullet'];
  return { modules, formats };
};

export const generateRandomNumber = (length: number): number => {
  return Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) + Math.pow(10, length - 1);
};

export const bytesToSize = (bytes: number): string => {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return 'n/a';
  }
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  if (i === 0) {
    return `${bytes} ${sizes[i]}`;
  }
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const getFileBlob = async (url: string): Promise<AxiosResponse> => {
  const response: AxiosResponse = await axios.get(url, { responseType: 'blob' });
  return response;
};

export const downloadFile = (blobUrl: string, fileName: string): void => {
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = blobUrl;
  link.setAttribute('download', `${fileName}`);
  // Append to html link element page
  document.body.appendChild(link);
  // Start download
  link.click();
  // Clean up and remove link
  if (link.parentNode) {
    link.parentNode.removeChild(link);
  }
};
