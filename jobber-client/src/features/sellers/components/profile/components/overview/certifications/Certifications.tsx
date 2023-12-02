import { FC, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { ICertificate } from 'src/features/sellers/interfaces/seller.interface';
import { v4 as uuidv4 } from 'uuid';

import CertificateEditFields from './CertificateEditFields';

const Certifications: FC = (): ReactElement => {
  const [showCertificateAddForm, setShowCertificateAddForm] = useState<boolean>(false);
  const [showCertificateEditForm, setShowCertificateEditForm] = useState<boolean>(false);
  const [selectedCertificate, setSelectedCertificate] = useState<ICertificate>();
  const { sellerProfile, showEditIcons } = useContext(SellerContext);

  return (
    <div className="border-grey mt-6 border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">CERTIFICATIONS</h4>
        {showEditIcons && (
          <span
            onClick={() => {
              setShowCertificateAddForm(!showCertificateAddForm);
              setShowCertificateEditForm(false);
            }}
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
          >
            Add New
          </span>
        )}
      </div>
      <ul className="mb-0 list-none pt-1.5">
        {showCertificateAddForm && (
          <li className="flex justify-between">
            <CertificateEditFields type="add" setShowCertificateAddForm={setShowCertificateAddForm} />
          </li>
        )}
        {!showCertificateAddForm && (
          <>
            {sellerProfile?.certificates.map((certificate: ICertificate) => (
              <li key={uuidv4()} className="mb-2 flex justify-between">
                {!showCertificateEditForm && (
                  <div className="col-span-3 ml-4 flex flex-col pb-3 text-sm md:text-base">
                    <div className="mr-3 font-bold ">{certificate.name}</div>
                    <div className="mr-3 font-normal">
                      {certificate.from} - {certificate.year}
                    </div>
                  </div>
                )}
                {showCertificateEditForm && selectedCertificate?.name === certificate.name && (
                  <CertificateEditFields
                    type="edit"
                    selectedCertificate={selectedCertificate}
                    setShowCertificateEditForm={setShowCertificateEditForm}
                  />
                )}
                {!showCertificateEditForm && showEditIcons && (
                  <div className="mr-4">
                    <FaPencilAlt
                      onClick={() => {
                        setShowCertificateAddForm(false);
                        setShowCertificateEditForm(!showCertificateEditForm);
                        setSelectedCertificate(certificate);
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

        {sellerProfile.certificates.length === 0 && !showCertificateAddForm && !showCertificateEditForm && (
          <li className="flex justify-between mb-2 ml-4">No information</li>
        )}
      </ul>
    </div>
  );
};

export default Certifications;
