import React, { CSSProperties, useRef, useState } from "react";
import { VscEdit } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";
import CButton from "./CButton";

interface MarkDownInputProps {
  children?: React.ReactNode;
  value: string;
  onChange: (newValue: string) => void;
  style?: CSSProperties;
  defaultMode?: "edit" | "view";
  onChangeMode?: () => void;
  autofocus?: boolean;
}

const MarkDownInput: React.FC<MarkDownInputProps> = ({
  value,
  onChange,
  style,
  defaultMode = "view",
  onChangeMode,
  autofocus = true,
}) => {
  const [isEdit, setIsEdit] = useState(defaultMode === "edit" ? true : false);
  const isBlurEvent = useRef(false);

  return (
    <>
      <div
        className="markdown-container"
        style={{
          position: "relative",
          border: "1px solid black",
          minHeight: 150,
          padding: "5px",
          ...style,
        }}
      >
        <div className="togger">
          <CButton
            type="button"
            onClick={() => {
              if (!isBlurEvent.current) {
                setIsEdit(!isEdit);
              }
            }}
            style={{ position: "absolute", top: 5, right: 10 }}
          >
            <VscEdit />
          </CButton>
        </div>
        {isEdit ? (
          <textarea
            autoFocus={autofocus}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            onBlur={() => {
              isBlurEvent.current = true;
              setTimeout(() => {
                isBlurEvent.current = false;
              }, 500);
              setIsEdit(false);
              onChangeMode && onChangeMode();
            }}
            style={{
              border: "none",
              padding: "10px 5px 5px 5px",
              width: "98%",
              fontSize: 20,
              minHeight: 150,
            }}
          ></textarea>
        ) : (
          <div
            style={{
              border: "none",
              minHeight: 150,
              padding: 5,
            }}
            onClick={() => {
              setIsEdit(true);
            }}
          >
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        )}
      </div>
    </>
  );
};
export default MarkDownInput;
