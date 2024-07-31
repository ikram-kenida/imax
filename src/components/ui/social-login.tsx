import axiosClient from "@/axios";
import { useStateContext } from "@/contexts/ContextProvider";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export const SocialLogin = ({
  text,
}: {
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
}) => {
  const { setCurrentUser, setUserToken } = useStateContext();

  const onSuccess = (credentialResponse: CredentialResponse) => {
    const credentialResponseDecode = jwtDecode(
      credentialResponse.credential ?? ""
    );

    axiosClient
      .post("/auth/google-login", credentialResponseDecode)
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      });
  };

  return (
    <div className="mt-8 *:w-full">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
        size="large"
        text={text}
        theme="filled_blue"
      />
    </div>
  );
};
