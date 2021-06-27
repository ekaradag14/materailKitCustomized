import React,{useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";
import {  useNavigate } from "react-router-dom";

import axios from 'axios'
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard//Sales';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';

const Dashboard = (props) => {

  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            {props.data.dashboardStats && props.data.dashboardStats.map(
              (el, ind) => {
                return (
                  <Grid key={ind} item lg={3} sm={6} xl={3} xs={12}>
                    <Budget data={el} />
                  </Grid>
                );
              }
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => ({
  data: state.projectData,
});
export default connect(mapStateToProps)(Dashboard);
