import React from "react";

interface NotFoundProps {
  children?: React.ReactNode;
}

const NotFound: React.FC<NotFoundProps> = ({}) => {
  return (
    <>
      <h1>Page not found {`:<`}</h1>
    </>
  );
};
export default NotFound;
