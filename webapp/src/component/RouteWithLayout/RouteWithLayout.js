import React from 'react';
import {  Route } from 'react-router-dom';

const RouteWithLayout=(props)=> {
    const {layout:Layout,component:Component, ...rest} = props;
    return (
        <Route
            {...rest}
            render={()=>(
                    <Layout>
                        <Component/>
                    </Layout>
                )
            }
        />
    );
}
  

export default RouteWithLayout;