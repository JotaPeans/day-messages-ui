import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://api.day-messages.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
