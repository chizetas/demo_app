import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";



interface MatchParams {
    itemcode: string
}
export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props)=> {
    // console.log(props.history);
    // console.log(props.location);
    // console.log(props.match);
    return <h1>item detail, itemcode: {props.match.params.itemcode} </h1>
}