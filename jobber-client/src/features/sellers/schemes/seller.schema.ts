import { array, boolean, object, ObjectSchema, string } from 'yup';

import { IEducation, IExperience, ILanguage, IPersonalInfoData } from '../interfaces/seller.interface';

const personalInfoSchema: ObjectSchema<IPersonalInfoData> = object({
  fullName: string().required({ fullName: 'Fullname is a required field' }),
  profilePicture: string().required({ profilePicture: 'Profile picture is a required field' }),
  description: string().required({ description: 'Description is a required field' }),
  responseTime: string().required({ responseTime: 'Response time is a required field' }),
  oneliner: string().required({ oneliner: 'Oneliner is a required field' })
});

const experienceSchema: ObjectSchema<IExperience> = object({
  _id: string().optional(),
  title: string().required({ title: 'Title is a required field' }),
  company: string().required({ company: 'Company is a required field' }),
  startDate: string()
    .notOneOf(['Start Year'], { startDate: 'Select a start year' })
    .required({ startDate: 'Start year is a required field' }),
  endDate: string().notOneOf(['End Year'], { endDate: 'Select an end year' }).required({ endDate: 'End year is a required field' }),
  description: string().required({ description: 'Decription is a required field' }),
  currentlyWorkingHere: boolean().optional()
});

const educationSchema: ObjectSchema<IEducation> = object({
  _id: string().optional(),
  country: string().notOneOf(['Country'], { country: 'Select a country' }).required({ country: 'Country is a required field' }),
  university: string().required({ university: 'University is a required field' }),
  title: string().notOneOf(['Title'], { title: 'Add a title' }).required({ title: 'Title is a required field' }),
  major: string().required({ major: 'Major is a required field' }),
  year: string().notOneOf(['Year'], { year: 'Select a year' }).required({ year: 'Year is a required field' })
});

const languagesSchema: ObjectSchema<ILanguage> = object({
  _id: string().optional(),
  language: string().required({ language: 'Language is a required field' }),
  level: string().notOneOf(['Level'], { level: 'Select a level' }).required({ level: 'level is a required field' })
});

const skillSchema = string().required('Please add at least 1 skill');

const ArrayOfExperienceSchema = array().of(experienceSchema);
const ArrayOfEducationSchema = array().of(educationSchema);
const ArrayOfSkillsSchema = array().of(skillSchema);
const ArrayOfLanguagesSchema = array().of(languagesSchema);

export { ArrayOfEducationSchema, ArrayOfExperienceSchema, ArrayOfLanguagesSchema, ArrayOfSkillsSchema, personalInfoSchema };
