import React, { useEffect, useState } from "react";
import LeftView from "../components/LeftView";
import LinkView from "../components/LinkView";
import { fetching } from "../ultis/fetch";

interface DashBoardProps {
  children?: React.ReactNode;
}

const DashBoard: React.FC<DashBoardProps> = ({}) => {
  const [member, setMember] = useState<IMember | null>(null);
  const [reloadView, setReloadView] = useState(false);

  useEffect(() => {
    fetching({
      url: `${import.meta.env.VITE_API_URL}/api/v1/member`,
      method: "GET",
    }).then(({ data }) => {
      if (data.ok) {
        setMember(data.data.member);
      }
    });
  });
  return (
    <>
      <div className="dashboard">
        <LeftView />
        {member && (
          <div className="right-view">
            <LinkView forceReload={reloadView} usernameArg={member.username} />
          </div>
        )}
      </div>
    </>
  );
};
export default DashBoard;
