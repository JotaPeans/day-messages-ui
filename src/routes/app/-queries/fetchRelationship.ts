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

export type RelationshipType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  relatedUser: UserType;
};

export async function fetchRelationship() {
  const { data } = await api.get<RelationshipType>("/relationship");
  return data;
}
