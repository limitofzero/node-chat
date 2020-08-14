import React from "react";
import { Redirect } from "react-router";

export interface ProtectedProps {
  component: any,
  isActive: boolean,
  redirectTo: string
}

export const ProtectedRoute = (props: ProtectedProps) => {
  const { isActive, redirectTo } = props;
  const Component = props.component;

  return isActive
    ? <Component/>
    : <Redirect to={redirectTo}/>;
};
