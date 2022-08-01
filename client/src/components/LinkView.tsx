import React, { useEffect, useMemo, useState } from "react";
import { Circles } from "react-loading-icons";
import { useLocation } from "react-router-dom";
import { fetching } from "../ultis/fetch";
import OneLink from "./OneLink";

interface MemberProps {
  children?: React.ReactNode;
  forceReload?: boolean;
  usernameArg?: string;
}

const LinkView: React.FC<MemberProps> = ({ forceReload, usernameArg }) => {
  const [member, setMember] = useState<IMember | null>(null);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  const username = useMemo(() => {
    if (usernameArg) {
      return usernameArg;
    }
    if (pathname.length > 2) {
      return pathname.slice(1);
    }
    return "";
  }, [pathname]);

  useEffect(() => {
    fetching({
      url: `${import.meta.env.VITE_API_URL}/api/v1/member/show/${username}`,
      method: "GET",
    }).then(({ data }) => {
      setLoading(false);
      console.log(data);
      setMember(data.data.member);
    });
  }, [username, forceReload]);

  return (
    <div className="link-view">
      {loading ? (
        <div className="loading-container">
          <Circles fill="red" />
        </div>
      ) : (
        member && (
          <>
            <h4>
              Member Name: {member.firstname} {member.lastname}
            </h4>
            {member.links.map((link) => (
              <OneLink key={link.id} link={link} />
            ))}
          </>
        )
      )}
    </div>
  );
};
export default LinkView;
