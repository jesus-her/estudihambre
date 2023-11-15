"use client";

import {
  Button,
  Modal as ModalUi,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const { onOpenChange } = useDisclosure();

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    // if (disabled) {
    //   return;
    // }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 100);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (!secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <ModalUi
        scrollBehavior="normal"
        isOpen={showModal}
        onOpenChange={onOpenChange}
        onClose={handleClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{body}</ModalBody>
              <ModalFooter>
                {footer}

                {secondaryAction && secondaryActionLabel && (
                  <Button
                    fullWidth
                    radius="full"
                    variant="shadow"
                    color="primary"
                    onClick={handleSecondaryAction}
                  >
                    {secondaryActionLabel}
                  </Button>
                )}
                <Button
                  fullWidth
                  radius="full"
                  variant="shadow"
                  color="primary"
                  isDisabled={disabled}
                  onClick={handleSubmit}
                >
                  {actionLabel}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </ModalUi>
    </>
  );
};

export default Modal;
