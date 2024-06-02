import { Button } from "@mui/material";
import { FC, useMemo } from "react";

type Props = {
  client_id: string;
  redirect_uri: string;
  display?: string;
  extras?: string;
  response_type?: string;
  scope?: string;
};
const InstagramBusinessLogin: FC<Props> = ({
  client_id,
  redirect_uri,
  display = "page",
  extras = '{"setup":{"channel":"IG_API_ONBOARDING"}}',
  response_type = "token",
  scope = "instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement",
}) => {
  const url = useMemo(
    () =>
      `https://www.facebook.com/dialog/oauth
  ?client_id=${client_id}
  &display=${display}
  &extras=${extras}
  &redirect_uri=${redirect_uri}
  &response_type=${response_type}
  &scope=${scope}`.replace(/\s+/g, ""),
    [client_id, redirect_uri, display, extras, response_type, scope]
  );

  return <Button href={url}>Business Login for Instagram</Button>;
};

export default InstagramBusinessLogin;
