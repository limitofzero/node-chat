import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

export interface ProtectedProps extends RouteProps {
  component: any,
  isActive: boolean,
  redirectTo: string
}

export const ProtectedRoute = (props: ProtectedProps) => {
  const { component, isActive, redirectTo, ...rest } = props;
  const Component = component;

  return (
    <Route {...rest}
           render={
             props => {
               return isActive
                 ? <Component {...rest} {...props}/>
                 : <Redirect to={redirectTo}/>;
             }
           }
    />
  );
};
