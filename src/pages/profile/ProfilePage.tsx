import React from "react";
import { MainLayout } from "../../layout";
import { ProfileModule } from "./ProfileModule";


export const ProfilePage: React.FC = (props) => {
    return (
        <MainLayout>
            <ProfileModule/>
        </MainLayout>
    );
}