import React from "react";

interface LeftViewProps {
  children?: React.ReactNode;
}

const LeftView: React.FC<LeftViewProps> = ({}) => {
  return (
    <>
      <div className="left-view">Left View</div>
    </>
  );
};
export default LeftView;
