import React from "react";
import NormalPost from "../../components/NormalPost";

const renderPostByType = (post, full) => {
  switch (post.postType) {
    case "normal":
      return <NormalPost post={post} full={full} />;
    case "shared":
      return <div>Shared</div>;
    case "quote":
      return <div>Quote</div>;
    case "poll":
      return <div>Poll</div>;
    default:
      return null;
  }
};

const Media = ({ results }) => {
  return (
    <div>
      {results.map((post, index) => (
        <div key={post._id || index}>{renderPostByType(post, true)}</div>
      ))}
    </div>
  );
};

export default Media;
