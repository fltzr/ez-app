import {
  usePageloadMutation,
  useSigninMutation,
  useSignoutMutation,
} from "@/common/api/auth";
import type { SignInSchemaType } from "@/features/auth/types";
import type { Account } from "@/types/user";
import { useAuthStore } from "../auth-store";
import { useAuthData } from "./use-auth-data";

export const useAuth = () => {
  const authenticated = Boolean(useAuthStore((s) => s.account));
  const account = useAuthStore((s) => s.account);
  const pageloadMutation = usePageloadMutation();

  const { signin: userDataSignin, signout: userDataSignout } = useAuthData();

  const pageload = async () => {
    console.log("pageload");

    let response: { isAuthenticated: boolean; user: Account | null };

    try {
      response = await pageloadMutation.mutateAsync();
    } catch (error) {
      console.log(JSON.stringify(error));

      response = {
        isAuthenticated: false,
        user: null,
      };
    }

    console.log("pageload response", JSON.stringify(response));

    return userDataSignin(response.user);
  };

  const signin = async (signinData: SignInSchemaType) => {
    let response: Account;

    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      response = await useSigninMutation().mutateAsync(signinData);
    } catch (error) {
      return;
    }

    return userDataSignin(response);
  };

  const signout = async () => {
    if (!authenticated) {
      return;
    }

    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useSignoutMutation().mutateAsync();
    } catch (error) {
      return;
    }

    userDataSignout();
  };

  return {
    authenticated,
    account,
    pageload,
    signin,
    signout,
  };
};
