import { cloneDeep, filter, findIndex } from 'lodash';
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { ILanguage, ILanguageEditFieldsProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextInput from 'src/shared/inputs/TextInput';
import { languageLevel, showErrorToast } from 'src/shared/utils/utils.service';

const LanguageFields: FC<ILanguageEditFieldsProps> = ({
  type,
  selectedLanguage,
  setShowLanguageAddForm,
  setShowLanguageEditForm
}): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);
  const [level, setLevel] = useState<string>(selectedLanguage ? `${selectedLanguage.level}` : '');
  const [language, setLanguage] = useState<string>(selectedLanguage ? `${selectedLanguage.language}` : '');

  const onHandleUpdate = (): void => {
    if (type === 'add') {
      const newItem: ILanguage = {
        level,
        language
      };
      const clonedLanguages: ILanguage[] = cloneDeep(sellerProfile?.languages) as ILanguage[];
      clonedLanguages.push(newItem);
      if (setSellerProfile && setShowLanguageAddForm) {
        setSellerProfile({ ...sellerProfile, languages: clonedLanguages });
        setShowLanguageAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile.languages, (value: ILanguage) => value._id === selectedLanguage?._id);
      const clonedItem: ILanguage = { level: !language ? '' : level, language, _id: selectedLanguage?._id };
      const clonedLanguages: ILanguage[] = cloneDeep(sellerProfile?.languages) as ILanguage[];
      clonedLanguages.splice(itemIndex, 1, clonedItem);
      const filtered = filter(clonedLanguages, (item: ILanguage) => item.language !== '');
      if (setSellerProfile && setShowLanguageEditForm && filtered.length > 0) {
        setSellerProfile({ ...sellerProfile, languages: clonedLanguages });
        setShowLanguageEditForm(false);
      } else {
        showErrorToast('You need to have at least one language.');
      }
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 grid grid-cols-1 gap-y-3 px-3 md:grid-cols-2 md:gap-x-2">
        <div className="">
          <TextInput
            className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Language"
            type="text"
            name="language"
            value={language}
            onChange={(event: ChangeEvent) => {
              setLanguage((event.target as HTMLInputElement).value);
            }}
          />
        </div>
        <div className="relative">
          <Dropdown text={level} maxHeight="300" mainClassNames="absolute bg-white z-50" values={languageLevel()} setValue={setLevel} />
        </div>
      </div>
      <div className="z-20 my-4 mt-10 flex cursor-pointer justify-center md:z-0 md:mt-0">
        <Button
          disabled={(level === 'Level' || !language) && type === 'add'}
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2
            ${(level === 'Level' || !language) && type === 'add' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
          `}
          label={`${type === 'add' ? 'Add' : 'Update'}`}
          onClick={onHandleUpdate}
        />
        &nbsp;&nbsp;
        <Button
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
          onClick={() => {
            if (type === 'add' && setShowLanguageAddForm) {
              setShowLanguageAddForm(false);
            } else if (type === 'edit' && setShowLanguageEditForm) {
              setShowLanguageEditForm(false);
            }
          }}
        />
      </div>
    </div>
  );
};

export default LanguageFields;
