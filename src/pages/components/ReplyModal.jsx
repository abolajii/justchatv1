import React from "react";
import { BottomIcons } from "../../components";
import ReplyPost from "../../components/ReplyPost";
import usePostStore from "../store/usePostStore";

const ReplyModal = ({ post }) => {
  return (
    <div>
      <p>Reply to post</p>
      <div>
        <ReplyPost />
      </div>
    </div>
  );
};

export default ReplyModal;
