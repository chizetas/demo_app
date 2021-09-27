import React from 'react'
import { Header, Footer, Carousel } from '../../components';
import { MainLayout } from "../../layout"
import styles from './HomePage.module.css'
export class HomePage extends React.Component {
    render() {
        return (
            <>
                <MainLayout>
                    <Carousel />
                </MainLayout>
            </>


        );
    }
}