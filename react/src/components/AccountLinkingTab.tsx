import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { ElementType, FC, useEffect, useState } from "react";
import { AuthResponse } from "./LoginWithFacebook";
import { apiClient } from "../utils/apiClient";
import { toast } from "../utils/toast";

export type InstagramBusinessAccount = {
  id: string;
  ig_id: number;
  username: string;
  profile_picture_url?: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  name?: string;
};

type Props = {
  appId?: string;
  config_id?: string;
};
const AccountLinkingTab: FC<Props> = ({
  appId = "292351890511844",
  config_id = "791585022693934",
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [instagramAccounts, setInstagramAccounts] = useState<
    InstagramBusinessAccount[]
  >([]);
  const [, setScriptLoaded] = useState(false);

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };

    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: "v20.0", // Use this Graph API version for this call.
      });

      console.log("FB SDK loaded");

      window.FB.getLoginStatus((response: object) => {
        console.log(response);
      });
    };

    window.checkLoginState = () => {
      console.log("cheking...");
      window.FB.getLoginStatus((response: AuthResponse) => {
        console.log(response);
        handleLogin(response);
      });
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    loadScript();
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (res: AuthResponse) => {
    try {
      if (res.status !== "connected") {
        return;
      }
      const response = await apiClient.post<{
        message: string;
        instagramAccounts: InstagramBusinessAccount[];
      }>("/auth/login/instagram", res);

      setIsLoggedIn(true);
      setInstagramAccounts(response.data.instagramAccounts);
      toast({
        message: response.data.message,
        severity: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAccounts = async () => {
    try {
      const response = await apiClient.get<{
        message: string;
        instagramAccounts: InstagramBusinessAccount[];
      }>("/auth/getAccounts/instagram");

      setIsLoggedIn(true);
      setInstagramAccounts(response.data.instagramAccounts);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack spacing={4}>
      <Box
        component={"fb:login-button" as ElementType}
        config_id={config_id}
        onlogin="checkLoginState();"
      ></Box>
      {isLoggedIn &&
        instagramAccounts.map((account, index) => (
          <>
            <Stack
              direction={"row"}
              spacing={6}
              sx={{
                alignItems: "center",
              }}
            >
              <Avatar
                src={account.profile_picture_url}
                sx={{
                  width: 100,
                  height: 100,
                }}
              >
                {account.username}
              </Avatar>
              <Stack spacing={2}>
                <Typography>
                  <strong>{account.username}</strong>
                </Typography>
                <Typography variant="body2">{account.name}</Typography>
                <Typography variant="body2">
                  Followers: {account.followers_count}
                </Typography>
                <Typography variant="body2">
                  Following: {account.follows_count}
                </Typography>
                <Typography variant="body2">
                  Posts: {account.media_count}
                </Typography>
              </Stack>
            </Stack>
            {index !== instagramAccounts.length - 1 && <Divider />}
          </>
        ))}
    </Stack>
  );
};

export default AccountLinkingTab;
