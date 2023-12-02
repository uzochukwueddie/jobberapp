import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';

export type DivElementRefType = HTMLDivElement;

export interface ICheckoutProps {
  gigId: string;
  offer: IOffer;
}

export interface IOrderProps {
  order: IOrderDocument;
  authUser: IAuthUser;
}

export interface IOrderActivitiesProps {
  order: IOrderDocument;
  authUser: IAuthUser;
  viewDeliveryBtnClicked?: boolean;
  showDeliveryPanel?: boolean;
  showReviewPanel?: boolean;
}

export interface IOffer {
  [key: string]: string | number | boolean | undefined;
  gigTitle: string;
  price: number;
  description: string;
  deliveryInDays: number;
  oldDeliveryDate: string;
  newDeliveryDate: string;
  accepted: boolean;
  cancelled: boolean;
  reason?: string; // this is the reason for extending the delivery date
}

export interface IOrderDeliveredProps {
  ref?: HTMLDivElement;
}

export interface IOrderInvoice {
  invoiceId: string;
  orderId: string;
  date: string;
  buyerUsername: string;
  orderService: IOrderInvoiceService[];
}

export interface IOrderInvoiceService {
  service: string;
  quantity: number;
  price: number;
}

export interface IOrderContext {
  order?: IOrderDocument;
  authUser?: IAuthUser;
  orderInvoice?: IOrderInvoice;
  viewDeliveryBtnClicked?: boolean;
}

export interface IExtendedDateModalProps {
  order: IOrderDocument;
  onClose: () => void;
}

export interface IOrderTableProps {
  type: string;
  orders: IOrderDocument[];
  orderTypes: number;
}

export interface IActiveOrderProps {
  activeOrders: IOrderDocument[];
}

export interface IOrderDisplayModal {
  deliverWork: boolean;
  extendDelivery: boolean;
}

export interface IOrderDeliveredModal {
  delivery: boolean;
  deliveryApproval: boolean;
}

export interface IOrderReviewModal {
  buyerReview: boolean;
  sellerReview: boolean;
  buyerPanel: boolean;
  sellerPanel: boolean;
}

export interface IExtendedDelivery {
  originalDate: string;
  newDate: string;
  days: number;
  reason: string;
  deliveryDateUpdate?: string;
}

export interface IDeliveredWork {
  message: string;
  file: string;
  fileType: string;
  fileSize: number;
  fileName: string;
}

export interface IOrderEvents {
  placeOrder: string;
  requirements: string;
  orderStarted: string;
  deliveryDateUpdate?: string;
  orderDelivered?: string;
  buyerReview?: string;
  sellerReview?: string;
}

export interface IOrderReview {
  rating: number;
  review: string;
  date?: string;
}

export interface IOrderDocument {
  offer: IOffer;
  gigId: string;
  sellerId: string;
  sellerUsername: string;
  sellerImage: string;
  sellerEmail: string;
  gigCoverImage: string;
  gigMainTitle: string;
  gigBasicTitle: string;
  gigBasicDescription: string;
  buyerId: string;
  buyerUsername: string;
  buyerEmail: string;
  buyerImage: string;
  status: string;
  orderId: string;
  invoiceId: string;
  quantity: number;
  price: number;
  requestExtension?: IExtendedDelivery;
  serviceFee?: number;
  requirements?: string;
  approved?: boolean;
  cancelled?: boolean;
  delivered?: boolean;
  approvedAt?: string;
  deliveredWork?: IDeliveredWork[];
  dateOrdered?: string;
  events: IOrderEvents;
  buyerReview?: IOrderReview;
  sellerReview?: IOrderReview;
  paymentIntent?: string;
}

export interface IOrderMessage {
  sellerId?: string;
  buyerId?: string;
  ongoingJobs?: number;
  completedJobs?: number;
  totalEarnings?: number;
  purchasedGigs?: string;
  recentDelivery?: string;
  type?: string;
  receiverEmail?: string;
  username?: string;
  template?: string;
  sender?: string;
  offerLink?: string;
  amount?: string;
  buyerUsername?: string;
  sellerUsername?: string;
  title?: string;
  description?: string;
  deliveryDays?: string;
  orderId?: string;
  invoiceId?: string;
  orderDue?: string;
  requirements?: string;
  orderUrl?: string;
  originalDate?: string;
  newDate?: string;
  reason?: string;
  subject?: string;
  header?: string;
  total?: string;
  message?: string;
  serviceFee?: string;
}

export interface IOrderNotifcation {
  _id?: string;
  userTo: string;
  senderUsername: string;
  senderPicture: string;
  receiverUsername: string;
  receiverPicture: string;
  isRead?: boolean;
  orderId: string;
  type?: string;
  message: string;
  rating?: number;
  createdAt: Date;
}
