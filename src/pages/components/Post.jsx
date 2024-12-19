import React from "react";
import NormalPost from "./NormalPost";
import PollPost from "./PollPost";

const renderPostByType = (post, full) => {
  switch (post.postType) {
    case "normal":
      return <NormalPost post={post} full={full} />;
    case "shared":
      return <div>Shared</div>;
    case "quote":
      return <div>Quote</div>;
    case "poll":
      return (
        <div>
          <PollPost post={post} />
        </div>
      );
    default:
      return null;
  }
};

const Post = ({ post, full }) => {
  return <div>{renderPostByType(post, full)}</div>;
};

export default Post;
