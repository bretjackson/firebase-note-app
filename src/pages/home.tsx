import React, { useEffect } from "react";
import NotePage from "../domain/note/organisms/notePage";
import Layout from "../layout/layout";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

type Props = {};

const HomePage = (props: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <Layout>
      <NotePage />
    </Layout>
  );
};

export default HomePage;
