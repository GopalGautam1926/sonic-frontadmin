import React from "react";
import { useState,useEffect } from "react";
import DataFetchingStateComponent from "../../../../components/common/DataFetchingStateComponent";
import usersHttps from "../../../../services/https/resources/users.https";

export default function UserDetaiils({ usernameOrSub }) {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  const fetchProfile = () => {
    setState({ ...state, loading: true, error: null });
    usersHttps
      .getUserProfile(usernameOrSub)
      .then((res) => {
        setState({ ...state, loading: false, user: res.data });
      })
      .catch((err) => {
        setState({ ...state, loading: false, error: err });
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <DataFetchingStateComponent
      error={state.error}
      loading={state.loading}
      onClickTryAgain={() => fetchProfile()}
    >
      <div>
        <p>{state.user?.Username || "--"}</p>
        <p>{state.user?.UserAttributesObj?.email || "--"}</p>
      </div>
    </DataFetchingStateComponent>
  );
}
