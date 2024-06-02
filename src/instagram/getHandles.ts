import { apiClient } from "../utils/apiClient";

export type Page = {
  id: string;
  name: string;
  access_token?: string;
  instagram_business_account?: {
    id: string;
  };
};
export const getPages = async (access_token: string) => {
  const response = await apiClient.get("/me/accounts", {
    params: {
      fields: "instagram_business_account,id,name,access_token",
      access_token,
    },
  });

  return response.data.data;
};
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
export const getInstagramBusinessAccount = async (
  id: string,
  access_token: string
) => {
  const response = await apiClient.get(`/${id}`, {
    params: {
      fields:
        "id,ig_id,username,profile_picture_url,followers_count,follows_count,media_count,name",
      access_token,
    },
  });

  return response.data;
};
