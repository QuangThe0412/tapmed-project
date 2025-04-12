import React from "react";
import Modal from "react-modal";
import "./customModal.css";
import { X } from "lucide-react";

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  children,
  footer,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="custom-modal"
      contentLabel={title}
      ariaHideApp={false}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onRequestClose} className="modal-close">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </Modal>
  );
};

export default CustomModal;
