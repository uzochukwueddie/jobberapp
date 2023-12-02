import { FC, ReactElement } from 'react';
import browseImage from 'src/assets/browse.png';
import collaborate from 'src/assets/collaborate.png';
import contact from 'src/assets/contact.png';
import create from 'src/assets/create.png';

const HowItWorks: FC = (): ReactElement => {
  return (
    <section className="container mx-auto items-center bg-white">
      <div className="px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 lg:mb-16">
          <h2 className="mb-4 text-xl lg:text-2xl font-normal text-center tracking-tight text-sky-400">
            How <strong className="font-extrabold">Jobber</strong> works?
          </h2>
          <p className="text-gray-500 text-center sm:text-xl dark:text-gray-400">
            Find quality scholars, experts and freelancers for your next academic or business project.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-4">
          <div className="text-center">
            <div className="my-0 mx-auto bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={create} className="text-primary-600 dark:text-primary-300 h-15 w-15 dark:text-sky-400" alt="" />
            </div>
            <h3 className="mb-2 text-base lg:text-xl font-bold dark:text-sky-400">Create an account</h3>
            <p className="text-gray-500 lg:text-base dark:text-gray-400">Create an account on Jobber</p>
          </div>
          <div className="text-center">
            <div className="my-0 mx-auto bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={browseImage} className="text-primary-600 dark:text-primary-300 h-15 w-15" alt="" />
            </div>
            <h3 className="mb-2 text-base lg:text-xl font-bold dark:text-sky-400">Browse Experts</h3>
            <p className="text-gray-500 dark:text-gray-400">Browse and select the best expert for your work.</p>
          </div>
          <div className="text-center">
            <div className="my-0 mx-auto bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={contact} className="text-primary-600 dark:text-primary-300 h-15 w-15" alt="" />
            </div>
            <h3 className="mb-2 text-base lg:text-xl font-bold dark:text-sky-400">Contact Experts</h3>
            <p className="text-gray-500 dark:text-gray-400">You can send direct messages to experts.</p>
          </div>
          <div className="text-center">
            <div className="my-0 mx-auto bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={collaborate} className="text-primary-600 dark:text-primary-300 h-15 w-15" alt="" />
            </div>
            <h3 className="mb-2 text-base lg:text-xl font-bold dark:text-sky-400">Collaborate</h3>
            <p className="text-gray-500 dark:text-gray-400">Collaborate with suitable expert for your projects.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
