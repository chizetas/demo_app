import React from "react";
import { UserLayout } from "../../layout/userLayout";
import { LoginForm } from "./LoginForm";

export const LoginPage: React.FC = (props) => {
    return (
        <UserLayout>
            <LoginForm/>
        </UserLayout>
    );
}