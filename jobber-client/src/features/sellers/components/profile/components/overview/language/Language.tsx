import { FC, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { ILanguage } from 'src/features/sellers/interfaces/seller.interface';
import { v4 as uuidv4 } from 'uuid';

import LanguageFields from './LanguageFields';

const Language: FC = (): ReactElement => {
  const [showLanguageAddForm, setShowLanguageAddForm] = useState<boolean>(false);
  const [showLanguageEditForm, setShowLanguageEditForm] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>();
  const { sellerProfile, showEditIcons } = useContext(SellerContext);

  return (
    <div className="border-grey border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">LANGUAGE SKILLS</h4>
        {showEditIcons && (
          <span
            onClick={() => {
              setShowLanguageAddForm(!showLanguageAddForm);
              setShowLanguageEditForm(false);
            }}
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none pt-1.5">
        {showLanguageAddForm && (
          <li className="flex justify-between">
            <LanguageFields type="add" setShowLanguageAddForm={setShowLanguageAddForm} />
          </li>
        )}
        {!showLanguageAddForm && (
          <>
            {sellerProfile?.languages.map((lang: ILanguage) => (
              <li key={uuidv4()} className="mb-2 flex justify-between">
                {!showLanguageEditForm && (
                  <div className="col-span-3 ml-4 flex pb-3 text-sm md:text-base">
                    <div className="mr-3 font-bold">{lang.language}</div>
                    <div className="mr-3">-</div>
                    <div>{lang.level}</div>
                  </div>
                )}
                {showLanguageEditForm && selectedLanguage?._id === lang._id && (
                  <LanguageFields type="edit" selectedLanguage={lang} setShowLanguageEditForm={setShowLanguageEditForm} />
                )}
                {!showLanguageEditForm && showEditIcons && (
                  <div className="mr-4">
                    <FaPencilAlt
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageEditForm(!showLanguageEditForm);
                        setShowLanguageAddForm(false);
                      }}
                      size="12"
                      className="ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2"
                    />
                  </div>
                )}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Language;
