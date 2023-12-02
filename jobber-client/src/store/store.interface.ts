import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { IBuyerDocument } from 'src/features/buyer/interfaces/buyer.interface';
import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interface';
import { INotification } from 'src/shared/header/interfaces/header.interface';

export interface IReduxState {
  authUser: IAuthUser;
  header: string;
  logout: boolean;
  buyer: IBuyerDocument;
  seller: ISellerDocument;
  showCategoryContainer: boolean;
  notification: INotification;
}
