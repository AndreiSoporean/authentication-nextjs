import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/client";
import React from "react";
import ChangePasswordForm from "../components/profile/ChangePassForm";
import UserWelcome from "../components/profile/UserWelcome";

const Profile: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <UserWelcome user={props.session.user} />
      <ChangePasswordForm />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Profile;
