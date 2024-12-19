import React from "react";
import ModalChildren from "./ModalChildren";
import AnimateModal from "../components/AnimateModal";

const BookmarkModal = ({ isOpen, closeModal }) => {
  return (
    <div>
      <AnimateModal
        title={"Create New Folder"}
        isOpen={isOpen}
        closeModal={closeModal}
        body={<ModalChildren closeModal={closeModal} />}
      />
    </div>
  );
};

export default BookmarkModal;
