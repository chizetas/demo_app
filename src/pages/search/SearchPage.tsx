import styles from './SearchPage.module.css'
import React from 'react';
import { Header, Footer, FilterArea} from '../../components';
import { useParams } from 'react-router-dom'

interface MatchParams {
    keywords: string
}
export const SearchPage: React.FC = () => {
    const { keywords } = useParams<MatchParams>();
    return(
        <>
          <Header/>

          <div className = {styles["page-content"]}>
              <div className = {styles["product-list-container"]}>
                  <FilterArea />
              </div>
              
              <div className = {styles["product-list-container"]}>
                  {/* <ProductList /> */}
              </div>
          </div>
          <Footer/>
        </>

    )
    
}