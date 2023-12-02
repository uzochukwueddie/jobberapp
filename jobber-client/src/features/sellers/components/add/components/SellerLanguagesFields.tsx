import { ChangeEvent, FC, ReactElement } from 'react';
import { ILanguage, ILanguageProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { languageLevel } from 'src/shared/utils/utils.service';

import Dropdown from '../../../../../shared/dropdown/Dropdown';

const SellerLanguageFields: FC<ILanguageProps> = ({ languageFields, setLanguageFields }): ReactElement => {
  const addLanguageFields = (): void => {
    const newfield: ILanguage = {
      language: '',
      level: 'Level'
    };
    if (languageFields && setLanguageFields) {
      setLanguageFields([...languageFields, newfield]);
    }
  };

  const removeLanguageFields = (index: number): void => {
    if (setLanguageFields && languageFields && languageFields.length > 1) {
      const data: ILanguage[] = [...languageFields];
      data.splice(index, 1);
      setLanguageFields([...data]);
    }
  };

  const handleLanguageFieldsChange = (event: ChangeEvent, index: number): void => {
    if (languageFields && setLanguageFields) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const data: ILanguage[] = [...languageFields];
      data[index][target.name] = target.value;
      setLanguageFields([...data]);
    }
  };

  return (
    <>
      <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
        <div className="flex justify-between">
          <h2 className="pb-4 text-xl font-bold">Languages</h2>
          <Button
            className="md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
            onClick={addLanguageFields}
            label="Add More"
          />
        </div>
        {languageFields?.map((input: ILanguage, index: number) => (
          <div key={index} className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-2">
            <div className="">
              <TextInput
                className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                type="text"
                name="language"
                value={input.language}
                placeholder="Language"
                onChange={(event: ChangeEvent) => handleLanguageFieldsChange(event, index)}
              />
            </div>
            <div className="relative">
              <Dropdown
                text={input.level}
                maxHeight="300"
                mainClassNames={`absolute bg-white ${index < languageFields.length - 1 ? 'zIndexDropdown' : ''}`}
                values={languageLevel()}
                onClick={(item: string) => {
                  const data: ILanguage[] = [...languageFields];
                  data[index]['level'] = `${item}`;
                  if (setLanguageFields) {
                    setLanguageFields([...data]);
                  }
                }}
              />
            </div>
            <div className="mb-2">
              {languageFields.length > 1 && index > 0 && (
                <Button
                  className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                  onClick={() => removeLanguageFields(index)}
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

export default SellerLanguageFields;
