import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title; // Save the previous title
    document.title = title; // Set the new title

    return () => {
      document.title = previousTitle; // Restore the previous title when the component unmounts
    };
  }, [title]); // Dependency to update when the title changes
};

export default usePageTitle;
