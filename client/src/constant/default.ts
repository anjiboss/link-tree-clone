import { CSSProperties } from "react";

interface DefaultStyle {
  link: CSSProperties;
  anchor: CSSProperties;
  linkName: CSSProperties;
}

export const defaultStyle: DefaultStyle = {
  link: {
    width: "60vw",
    height: "60px",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    whiteSpace: "normal",
    border: "1px solid black",
    borderRadius: "30px",
  },
  anchor: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  linkName: {
    textAlign: "center",
  },
};
