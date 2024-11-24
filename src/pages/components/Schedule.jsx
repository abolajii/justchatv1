import React, { useState } from "react";
import ReuseableModal from "./ResuableModal";
import useModalStore from "../store/useModalStore";

const Schedule = () => {
  const { isScheduleModalOpen, closeScheduleModal } = useModalStore();

  return (
    <ReuseableModal
      isOpen={isScheduleModalOpen}
      closeModal={closeScheduleModal}
    >
      Schedule
    </ReuseableModal>
  );
};

export default Schedule;
