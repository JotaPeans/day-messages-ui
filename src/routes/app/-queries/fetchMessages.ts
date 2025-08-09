import { api } from "@/lib/utils";

export type UserType = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
};

export type MessageType = {
  id: string;
  createdAt: Date;
  message: string;
  userToId: string;
  userFromId: string;
  liked: boolean | null;
};

export type MessageWithUserSentType = {
  id: string;
  createdAt: Date;
  message: string;
  userToId: string;
  userFromId: string;
  userSent: UserType;
  liked: boolean | null;
};

export async function fetchMessages(page: number | string) {
  const { data } = await api.get<MessageWithUserSentType[]>(`/messages?page=${page}`);
  return data;
}
