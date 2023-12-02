import { FC, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { IExperience } from 'src/features/sellers/interfaces/seller.interface';
import { v4 as uuidv4 } from 'uuid';

import ExperienceFields from './ExperienceFields';

const Experience: FC = (): ReactElement => {
  const [showExperienceAddForm, setShowExperienceAddForm] = useState<boolean>(false);
  const [showExperienceEditForm, setShowExperienceEditForm] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] = useState<IExperience>();
  const { showEditIcons, sellerProfile } = useContext(SellerContext);

  return (
    <div className="border-grey mt-6 border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">EXPERIENCE</h4>
        {showEditIcons && !showExperienceAddForm && (
          <span
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
            onClick={() => {
              setShowExperienceAddForm(!showExperienceAddForm);
            }}
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none pt-1.5">
        {showExperienceAddForm && (
          <li className="flex justify-between">
            <ExperienceFields type="add" setShowExperienceAddForm={setShowExperienceAddForm} />
          </li>
        )}
        {!showExperienceAddForm && (
          <>
            {sellerProfile?.experience.map((experience: IExperience) => (
              <li key={uuidv4()} className="mb-1 flex justify-between">
                {!showExperienceEditForm && (
                  <div className="col-span-3 ml-4 flex flex-col pb-3 text-sm md:text-base">
                    <div className="mr-3 font-bold ">{experience.title}</div>
                    <div className="mr-3 font-normal">{experience.company}</div>
                    <div className="mr-3 font-normal">
                      {experience.startDate} - {experience.endDate}
                    </div>
                  </div>
                )}
                {showExperienceEditForm && selectedExperience?._id === experience._id && (
                  <ExperienceFields
                    type="edit"
                    selectedExperience={selectedExperience}
                    setShowExperienceEditForm={setShowExperienceEditForm}
                  />
                )}
                {!showExperienceEditForm && showEditIcons && (
                  <div className="mr-4">
                    <FaPencilAlt
                      size="12"
                      className="ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2"
                      onClick={() => {
                        setSelectedExperience(experience);
                        setShowExperienceEditForm(!showExperienceEditForm);
                        setShowExperienceAddForm(false);
                      }}
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

export default Experience;
