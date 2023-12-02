import { cloneDeep, findIndex } from 'lodash';
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { IEducation, IEducationEditProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { countriesList, degreeList, yearsList } from 'src/shared/utils/utils.service';

import Dropdown from '../../../../../../../shared/dropdown/Dropdown';

const EducationFields: FC<IEducationEditProps> = ({
  type,
  selectedEducation,
  setShowEducationAddForm,
  setShowEducationEditForm
}): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);
  const [country, setCountry] = useState<string>(selectedEducation?.country ?? 'Country');
  const [university, setUniversity] = useState<string>(selectedEducation?.university ?? '');
  const [title, setTitle] = useState<string>(selectedEducation?.title ?? 'Title');
  const [major, setMajor] = useState<string>(selectedEducation?.major ?? '');
  const [year, setYear] = useState<string>(selectedEducation?.year ?? 'Year');

  const onHandleUpdate = (): void => {
    if (type === 'add') {
      const item: IEducation = {
        title,
        country,
        university,
        major,
        year: `${year}`
      };
      const clonedEducation: IEducation[] = cloneDeep(sellerProfile?.education) as IEducation[];
      clonedEducation.push(item);
      if (setSellerProfile && setShowEducationAddForm) {
        setSellerProfile({ ...sellerProfile, education: clonedEducation });
        setShowEducationAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile?.education, (value: IEducation) => value._id === selectedEducation?._id);
      const clonedEducation: IEducation[] = cloneDeep(sellerProfile?.education) as IEducation[];
      const clonedItem: IEducation = {
        _id: selectedEducation?._id,
        title,
        country,
        university,
        major,
        year
      };
      clonedEducation.splice(itemIndex, 1, clonedItem);
      const filtered: IEducation[] = clonedEducation.filter((item: IEducation) => item.university !== '' && item.major !== '');
      if (setSellerProfile && setShowEducationEditForm) {
        setSellerProfile({ ...sellerProfile, education: filtered });
        setShowEducationEditForm(false);
      }
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 px-3">
        <div className="relative">
          <TextInput
            className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="University/College Name"
            type="text"
            name="university"
            value={university}
            onChange={(event: ChangeEvent) => setUniversity((event.target as HTMLInputElement).value)}
          />
        </div>
        <div className="relative h-[55px]">
          <Dropdown
            text={country}
            maxHeight="300"
            showSearchInput={true}
            mainClassNames="absolute bg-white z-50"
            values={countriesList()}
            setValue={setCountry}
          />
        </div>
        <div className="mt-4 grid h-1/5 grid-cols-4 gap-x-2 gap-y-3">
          <div className="relative">
            <Dropdown text={title} maxHeight="300" mainClassNames="absolute bg-white z-30" values={degreeList()} setValue={setTitle} />
          </div>
          <div className="col-span-2">
            <TextInput
              className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
              placeholder="Major e.g: Computer Engineering"
              type="text"
              name="major"
              value={major}
              onChange={(event: ChangeEvent) => setMajor((event.target as HTMLInputElement).value)}
            />
          </div>
          <div className="relative">
            <Dropdown text={year} maxHeight="300" mainClassNames="absolute bg-white z-30" values={yearsList(100)} setValue={setYear} />
          </div>
        </div>
      </div>
      <div className="mx-3 my-4 flex cursor-pointer justify-start md:z-0 md:mt-0">
        <Button
          disabled={(country === 'Country' || title === 'Title' || year === 'Year' || !university || !major) && type === 'add'}
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2 ${
            (country === 'Country' || title === 'Title' || year === 'Year' || !university || !major) && type === 'add'
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer'
          }`}
          onClick={onHandleUpdate}
          label={`${type === 'edit' ? 'Update' : 'Add'}`}
        />
        &nbsp;&nbsp;
        <Button
          onClick={() => {
            if (type === 'add' && setShowEducationAddForm) {
              setShowEducationAddForm(false);
            } else if (type === 'edit' && setShowEducationEditForm) {
              setShowEducationEditForm(false);
            }
          }}
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
        />
      </div>
    </div>
  );
};

export default EducationFields;
