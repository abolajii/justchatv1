import React from "react";
import NormalPost from "./NormalPost";
import PollPost from "./PollPost";

const renderPostByType = (post, full, bookmarks) => {
  switch (post.postType) {
    case "normal":
      return <NormalPost post={post} full={full} bookmarks={bookmarks} />;
    case "shared":
      return <div>Shared</div>;
    case "quote":
      return <div>Quote</div>;
    case "poll":
      return (
        <div>
          <PollPost post={post} bookmarks={bookmarks} />
        </div>
      );
    default:
      return null;
  }
};

const Post = ({ post, full, bookmarks }) => {
  return <div>{renderPostByType(post, full, bookmarks)}</div>;
};

export default Post;
