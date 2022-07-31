import React from "react";
import { defaultStyle } from "../constant/default";

interface OneLinkProps {
  children?: React.ReactNode;
  link: ILink;
}

const OneLink: React.FC<OneLinkProps> = ({ link }) => {
  return (
    <div style={defaultStyle.link}>
      <a style={defaultStyle.anchor} href={link.link}>
        <p style={defaultStyle.linkName}>{link.name}</p>
      </a>
    </div>
  );
};
export default OneLink;
