import { useState } from 'react';
import { IEducation, IExperience, ILanguage, IPersonalInfoData } from 'src/features/sellers/interfaces/seller.interface';

import {
  ArrayOfEducationSchema,
  ArrayOfExperienceSchema,
  ArrayOfLanguagesSchema,
  ArrayOfSkillsSchema,
  personalInfoSchema
} from '../schemes/seller.schema';

interface IUseSellerSchema {
  personalInfo: IPersonalInfoData;
  experienceFields: IExperience[];
  educationFields: IEducation[];
  skillsFields: string[];
  languageFields: ILanguage[];
}

const useSellerSchema = ({
  personalInfo,
  experienceFields,
  educationFields,
  skillsFields,
  languageFields
}: IUseSellerSchema): [() => Promise<boolean>, IPersonalInfoData[], IExperience[], IEducation[], string[], ILanguage[]] => {
  const [personalInfoErrors, setPersonalInfoErrors] = useState<IPersonalInfoData[]>([]);
  const [experienceErrors, setExperienceErrors] = useState<IExperience[]>([]);
  const [educationErrors, setEducationErrors] = useState<IEducation[]>([]);
  const [skillsErrors, setSkillsErrors] = useState<string[]>([]);
  const [languagesErrors, setLanguagesErrors] = useState<ILanguage[]>([]);

  async function schemaValidation(): Promise<boolean> {
    await personalInfoSchema
      .validate(personalInfo, { abortEarly: false })
      .then(() => setPersonalInfoErrors([]))
      .catch((error) => {
        setPersonalInfoErrors([...error.errors]);
      });
    await ArrayOfExperienceSchema.validate(experienceFields, { abortEarly: false })
      .then(() => setExperienceErrors([]))
      .catch((error) => {
        setExperienceErrors(error.errors);
      });
    await ArrayOfEducationSchema.validate(educationFields, { abortEarly: false })
      .then(() => setEducationErrors([]))
      .catch((error) => {
        setEducationErrors(error.errors);
      });
    await ArrayOfSkillsSchema.validate(skillsFields, { abortEarly: false })
      .then(() => setSkillsErrors([]))
      .catch((error) => {
        setSkillsErrors(error.errors);
      });
    await ArrayOfLanguagesSchema.validate(languageFields, { abortEarly: false })
      .then(() => setLanguagesErrors([]))
      .catch((error) => {
        setLanguagesErrors(error.errors);
      });
    const isPersonalInfoValid = await personalInfoSchema.isValid(personalInfo, { abortEarly: false });
    const isExperienceValid = await ArrayOfExperienceSchema.isValid(experienceFields, { abortEarly: false });
    const isEducationValid = await ArrayOfEducationSchema.isValid(educationFields, { abortEarly: false });
    const isSkillValid = await ArrayOfSkillsSchema.isValid(skillsFields, { abortEarly: false });
    const isLanguageValid = await ArrayOfLanguagesSchema.isValid(languageFields, { abortEarly: false });

    return isPersonalInfoValid && isExperienceValid && isEducationValid && isSkillValid && isLanguageValid;
  }
  return [schemaValidation, personalInfoErrors, experienceErrors, educationErrors, skillsErrors, languagesErrors];
};

export { useSellerSchema };
