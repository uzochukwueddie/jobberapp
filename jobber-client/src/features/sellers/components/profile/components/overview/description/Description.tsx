import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import Button from 'src/shared/button/Button';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';

const Description: FC = (): ReactElement => {
  const { sellerProfile, setSellerProfile, showEditIcons } = useContext(SellerContext);
  const [showDescriptionEditForm, setShowDescriptionEditForm] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(sellerProfile.description ? `${sellerProfile.description}` : '');

  return (
    <div className="border-grey border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">DESCRIPTION</h4>
        {showEditIcons && !showDescriptionEditForm && (
          <span
            onClick={() => {
              setShowDescriptionEditForm(!showDescriptionEditForm);
            }}
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
          >
            Edit Description
          </span>
        )}
      </div>
      <div className="mb-0 py-1.5">
        {!showDescriptionEditForm && <div className="px-3.5 text-sm md:text-base">{sellerProfile.description}</div>}

        {showDescriptionEditForm && (
          <div className="flex w-full flex-col">
            <div className="mb-4 px-3">
              <TextAreaInput
                className="border-grey focus:border-grey block w-full rounded border p-2.5 text-sm text-gray-900 focus:ring-blue-500"
                placeholder="Write description..."
                name="description"
                value={description}
                rows={5}
                maxLength={600}
                onChange={(event: ChangeEvent) => setDescription((event.target as HTMLInputElement).value)}
              />
            </div>
            <div className="mx-3 mb-2 flex cursor-pointer justify-start">
              <Button
                disabled={!description}
                className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2
                ${!description ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
                `}
                label="Update"
                onClick={() => {
                  if (setSellerProfile) {
                    setSellerProfile({ ...sellerProfile, description });
                    setShowDescriptionEditForm(false);
                  }
                }}
              />
              &nbsp;&nbsp;
              <Button
                className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
                label="Cancel"
                onClick={() => setShowDescriptionEditForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
