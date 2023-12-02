import { ChangeEvent, FC, ReactElement } from 'react';
import { ISocialLinksProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';

const SellerSocialLinksFields: FC<ISocialLinksProps> = ({ socialFields, setSocialFields }): ReactElement => {
  const adSocialLinkFields = (): void => {
    if (setSocialFields && socialFields) {
      setSocialFields([...socialFields, '']);
    }
  };

  const removeSocialLinkFields = (index: number): void => {
    if (socialFields && setSocialFields && socialFields.length > 1) {
      const data: string[] = [...socialFields];
      data.splice(index, 1);
      setSocialFields([...data]);
    }
  };

  const handleSocialLinksFieldsChange = (event: ChangeEvent, index: number): void => {
    if (setSocialFields && socialFields) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const data: string[] = [...socialFields];
      data[index] = target.value;
      setSocialFields([...data]);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col px-6 pb-3 pt-6">
        <div className="flex justify-between">
          <h2 className="pb-4 text-xl font-bold">Social Links</h2>
          <Button
            onClick={adSocialLinkFields}
            className="md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
            label="Add More"
          />
        </div>
        {socialFields?.map((input: string, index: number) => (
          <div key={index}>
            <TextInput
              className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
              placeholder="Social media link"
              type="text"
              name="url"
              value={input}
              onChange={(event: ChangeEvent) => handleSocialLinksFieldsChange(event, index)}
            />
            <div className="my-4">
              {socialFields.length > 1 && index > 0 && (
                <Button
                  className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                  onClick={() => removeSocialLinkFields(index)}
                  label="Delete"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SellerSocialLinksFields;
