"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";
import { MdClose } from "react-icons/md";
import dynamic from "next/dynamic";

const QRModal = ({
  toggleModal,
  qrCodeValue,
}: {
  toggleModal: () => void;
  qrCodeValue: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const CC = dynamic(
    () => import("../CopyClipboard").then((mod) => mod.CopyClipboard),
    { ssr: false }
  );

  console.log(CC);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 overscroll-none">
      <div className="bg-white p-12 rounded-md shadow-md relative max-w-[90%] gap-4 flex flex-col justify-center items-center">
        <button
          className="  text-black rounded hover:opacity-90 absolute top-2 right-2 flex items-center gap-2 px-2"
          onClick={toggleModal}
        >
          <MdClose size={30} />
        </button>{" "}
        <h1 className=" text-lg font-semibold text-black text-center">
          Comparte esta publicación con el código QR
        </h1>
        <QRCode value={qrCodeValue} size={200} />
        <CC content={qrCodeValue} />
      </div>
    </div>
  );
};

export default QRModal;
