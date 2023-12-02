export interface IBuyerDocument {
  _id?: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  country: string;
  isSeller?: boolean;
  purchasedGigs: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IReduxBuyer {
  type?: string;
  payload: IBuyerDocument;
}
