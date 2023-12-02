/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { validationErrorsType } from 'src/shared/shared.interface';
import { ObjectSchema } from 'yup';

import { ICreateGig } from '../interfaces/gig.interface';

interface IUseGigSchema {
  schema: ObjectSchema<ICreateGig | any>;
  gigInfo: ICreateGig;
}

const useGigSchema = ({ schema, gigInfo }: IUseGigSchema): [() => Promise<boolean>, validationErrorsType[]] => {
  const [validationErrors, setValidationErrors] = useState<validationErrorsType[]>([]);

  async function schemaValidation(): Promise<boolean> {
    await schema
      .validate(gigInfo, { abortEarly: false })
      .then(() => setValidationErrors([]))
      .catch((err) => {
        setValidationErrors([...err.errors]);
      });
    const validation: boolean = await schema.isValid(gigInfo, { abortEarly: false });
    return validation;
  }
  return [schemaValidation, validationErrors];
};

export { useGigSchema };
