import { ChangeEvent, FC, ReactElement } from 'react';
import { FaCircleNotch, FaRegFileArchive, FaTimes } from 'react-icons/fa';
import TextInput from 'src/shared/inputs/TextInput';
import { validateImage } from 'src/shared/utils/image-utils.service';
import { bytesToSize } from 'src/shared/utils/utils.service';

import { IFilePreviewProps } from '../../interfaces/chat.interface';

const ChatImagePreview: FC<IFilePreviewProps> = ({
  image,
  file,
  isLoading,
  message,
  handleChange,
  onSubmit,
  onRemoveImage
}): ReactElement => {
  return (
    <div className="border-grey left-0 top-0 z-50 h-[190px] w-full border-t bg-white">
      <>
        {!isLoading ? (
          <>
            <div className="mb-1 w-full p-2">
              <form onSubmit={onSubmit}>
                <TextInput
                  name="message"
                  type="text"
                  value={message}
                  className="border-grey mb-1 w-full rounded border p-3 text-sm font-normal text-gray-600 focus:outline-none"
                  placeholder="Enter your message..."
                  onChange={(event: ChangeEvent) => handleChange(event)}
                />
              </form>
            </div>
            <div className="border-grey absolute flex w-full cursor-pointer justify-between border-t bg-white p-2">
              {validateImage(file, 'image') ? (
                <img className="h-24 w-40 rounded object-cover" src={image} alt="" />
              ) : (
                <div className="border-grey flex h-24 w-40 flex-col items-center justify-center truncate rounded border p-2">
                  <FaRegFileArchive className="text-xs md:text-sm" size={25} />
                  <span className="max-w-[100%] overflow-hidden truncate py-1 text-xs font-bold">{file.name}</span>
                  <p className="text-xs">{bytesToSize(file.size)}</p>
                </div>
              )}

              <FaTimes className="text-[#bdbdbd]" onClick={onRemoveImage} />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-red-50">
            <FaCircleNotch className="mr-3 h-10 w-10 animate-spin" size={40} color="#50b5ff" />
            <span>Uploading...</span>
          </div>
        )}
      </>
    </div>
  );
};

export default ChatImagePreview;
