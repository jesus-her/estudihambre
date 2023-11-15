"use client";
import QRCode from "qrcode.react";
import { MdClose } from "react-icons/md";
import dynamic from "next/dynamic";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const QRModal = ({
  onOpenChange,
  isOpen,
  qrCodeValue,
}: {
  onOpenChange: () => void;
  qrCodeValue: string;
  isOpen: boolean;
}) => {
  const CC = dynamic(
    () => import("../CopyClipboard").then((mod) => mod.CopyClipboard),
    { ssr: false }
  );

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Comparte esta publicación con el código QR
            </ModalHeader>
            <ModalBody className=" flex flex-col justify-center items-center">
              <QRCode value={qrCodeValue} size={200} />
              <CC content={qrCodeValue} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default QRModal;
