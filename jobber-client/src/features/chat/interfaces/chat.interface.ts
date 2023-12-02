import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { IOffer } from 'src/features/order/interfaces/order.interface';
import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interface';

export interface IChatWindowProps {
  chatMessages: IMessageDocument[];
  isError: boolean;
  isLoading: boolean;
  setSkip?: Dispatch<SetStateAction<boolean>>;
}

export interface IFilePreviewProps {
  image: string;
  file: File;
  isLoading: boolean;
  message: string;
  handleChange: (event: ChangeEvent) => void;
  onSubmit: (event: FormEvent) => void;
  onRemoveImage: () => void;
}

export interface IConversationDocument {
  _id: string;
  conversationId: string;
  senderUsername: string;
  receiverUsername: string;
}

export interface IMessageDocument {
  _id?: string;
  conversationId?: string;
  body?: string;
  url?: string;
  file?: string;
  fileType?: string;
  fileSize?: string;
  fileName?: string;
  gigId?: string;
  sellerId?: string;
  buyerId?: string;
  senderUsername?: string;
  senderPicture?: string;
  receiverUsername?: string;
  receiverPicture?: string;
  isRead?: boolean;
  hasOffer?: boolean;
  offer?: IOffer;
  hasConversationId?: boolean;
  createdAt?: Date | string;
}

export interface IChatBoxProps {
  seller: IChatSellerProps;
  buyer: IChatBuyerProps;
  gigId: string;
  onClose: () => void;
}

export interface IChatSellerProps {
  _id: string;
  username: string;
  profilePicture: string;
  responseTime: number;
}

export interface IChatBuyerProps {
  _id: string;
  username: string;
  profilePicture: string;
}

export interface IChatMessageProps {
  message: IMessageDocument;
  seller?: ISellerDocument;
  gig?: ISellerGig;
}
