import React from "react";

import { Layout, Typography } from "antd";


export const Footer: React.FC = () => {
  return (
    <Layout.Footer>
    <Typography.Title level={3} style={{textAlign: 'center'}}>
        @ Pioneer Tools 2020
    </Typography.Title>
  </Layout.Footer>
  );
}