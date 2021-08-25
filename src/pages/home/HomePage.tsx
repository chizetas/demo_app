import React from 'react'
import {Header, Footer, Carousel } from '../../components';
import styles from './HomePage.module.css'
export class HomePage extends React.Component {
    render() {
        return (
            <>
                <Header />

                <Carousel />

                <Footer />
            </>

   
        );
    }
}