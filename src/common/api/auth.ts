import { useMutation } from "@tanstack/react-query";
import type { SignInSchemaType } from "@/features/auth/types";
import type { Account } from "@/types/user";
import { api } from "@/utils/axios";

type PageloadResponse = {
  isAuthenticated: boolean;
  user: Account;
};

export const usePageloadMutation = () =>
  useMutation({
    mutationKey: ["pageload-auth"],
    mutationFn: async () => {
      const response = await api.post<PageloadResponse>("/pageload");

      return response.data;
    },
    retry: false,
  });

export const useStartOpenIDFlowMutation = () =>
  useMutation({
    mutationFn: async () => {
      const response = await api.post("/openid/start");

      return response.status;
    },
  });

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async (data: SignInSchemaType) => {
      const response = await api.post<Account>("/signin", data);

      return response.data;
    },
  });

export const useSignoutMutation = () =>
  useMutation({
    mutationFn: async () => {
      const response = await api.post("/signout");

      return response.status;
    },
  });
