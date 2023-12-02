import { ChangeEvent, FC, ReactElement } from 'react';
import { IExperience, IExperienceProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/utils.service';

const SellerExperienceFields: FC<IExperienceProps> = ({ experienceFields, setExperienceFields }): ReactElement => {
  const handleExperienceFieldsChange = (event: ChangeEvent, index: number): void => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (experienceFields && setExperienceFields) {
      const data: IExperience[] = [...experienceFields];
      if (target.name === 'currentlyWorkingHere') {
        data[index]['currentlyWorkingHere'] = target.checked;
        data[index]['endDate'] = target.checked ? '' : 'Present';
        updatePresentEndDate(data, index);
      } else {
        data[index][target.name] = target.value;
      }
      setExperienceFields([...data]);
    }
  };

  const addExperienceFields = (): void => {
    const newField: IExperience = {
      title: '',
      company: '',
      startDate: 'Start Year',
      endDate: 'End Year',
      currentlyWorkingHere: false,
      description: ''
    };
    if (setExperienceFields && experienceFields) {
      setExperienceFields([...experienceFields, newField]);
    }
  };

  const removeExperienceFields = (index: number): void => {
    if (experienceFields && experienceFields.length > 1 && setExperienceFields) {
      const data: IExperience[] = [...experienceFields];
      data.splice(index, 1);
      setExperienceFields([...data]);
    }
  };

  const updatePresentEndDate = (data: IExperience[], index: number): void => {
    if (setExperienceFields) {
      if (!data[index]['currentlyWorkingHere']) {
        if (data[index]['endDate'] === 'Present') {
          data[index]['endDate'] = 'End Year';
          setExperienceFields(data);
        } else {
          data[index]['endDate'] = `${data[index]['endDate'] ?? 'End Year'}`;
          setExperienceFields([...data]);
        }
      } else {
        if (setExperienceFields && experienceFields) {
          const data: IExperience[] = [...experienceFields];
          data[index]['endDate'] = 'Present';
          setExperienceFields([...data]);
        }
      }
    }
  };

  return (
    <div className="border-grey flex w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Experience</h2>
        <Button
          className="md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
          label="Add More"
          onClick={() => addExperienceFields()}
        />
      </div>

      {experienceFields?.map((input: IExperience, index: number) => (
        <div key={index} className="mb-4">
          <TextInput
            className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            name="title"
            placeholder="Title (E.g: CEO)"
            value={input.title}
            onChange={(event: ChangeEvent) => handleExperienceFieldsChange(event, index)}
          />
          <TextInput
            className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="Company name"
            name="company"
            value={input.company}
            onChange={(event: ChangeEvent) => handleExperienceFieldsChange(event, index)}
          />
          <div className="mb-16 grid h-1/5 grid-cols-2 gap-x-2 gap-y-3">
            <div className="relative">
              <Dropdown
                text={input.startDate}
                maxHeight="300"
                mainClassNames="absolute bg-white"
                values={yearsList(100)}
                onClick={(item: string) => {
                  const data: IExperience[] = [...experienceFields];
                  data[index]['startDate'] = `${item}`;
                  if (setExperienceFields) {
                    setExperienceFields(data);
                  }
                }}
              />
            </div>
            <div
              className="relative"
              style={{
                cursor: `${input.currentlyWorkingHere ? 'none' : 'pointer'}`,
                pointerEvents: `${input.currentlyWorkingHere ? 'none' : 'auto'}`
              }}
            >
              <Dropdown
                text={input.endDate}
                maxHeight="300"
                mainClassNames="absolute bg-white"
                values={yearsList(100)}
                onClick={(item: string) => {
                  const data: IExperience[] = [...experienceFields];
                  data[index]['endDate'] = `${item}`;
                  if (setExperienceFields) {
                    setExperienceFields(data);
                  }
                }}
              />
            </div>
          </div>
          <div className="mb-4 mt-2 flex items-center">
            <TextInput
              id="default-checkbox"
              type="checkbox"
              name="currentlyWorkingHere"
              value={`${input.currentlyWorkingHere}`}
              checked={input.currentlyWorkingHere}
              onChange={(event: ChangeEvent) => handleExperienceFieldsChange(event, index)}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-normal">
              I am currently working here
            </label>
          </div>
          <div className="flex items-center">
            <TextAreaInput
              className="border-grey focus:border-grey block w-full rounded border p-2.5 text-sm text-gray-900 focus:ring-blue-500"
              name="description"
              value={input.description}
              rows={5}
              onChange={(event: ChangeEvent) => handleExperienceFieldsChange(event, index)}
              placeholder="Write description..."
            />
          </div>
          <div className="mt-2">
            {experienceFields.length > 1 && index > 0 && (
              <Button
                className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                label="Delete"
                onClick={() => removeExperienceFields(index)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerExperienceFields;
