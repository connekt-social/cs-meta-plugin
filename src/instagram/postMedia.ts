import { apiClient } from "../utils/apiClient";

export type MediaCreationParams = {
  user_id: string | number;
  url: string;
  caption: string;
  access_token: string;
  media_type?: "CAROUSEL" | "REELS" | "STORIES";
};
export const createContainer = async ({
  access_token,
  caption,
  url,
  user_id,
  media_type,
}: MediaCreationParams) => {
  const response = await apiClient.post<{
    id: string;
  }>(`/${user_id}/media`, undefined, {
    params: {
      image_url: url,
      caption,
      access_token,
      media_type,
    },
  });

  return response.data.id;
};

export const publishContainer = async (
  container_id: string,
  user_id: string | number,
  access_token: string
) => {
  const response = await apiClient.post(
    `/${user_id}/media_publish`,
    undefined,
    {
      params: {
        creation_id: container_id,
        access_token,
      },
    }
  );

  return response.data;
};

export const createAndPublishContainer = async (
  params: MediaCreationParams
) => {
  const container_id = await createContainer(params);
  return publishContainer(container_id, params.user_id, params.access_token);
};
