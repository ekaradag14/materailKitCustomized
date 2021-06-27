import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "src/components/account/AccountProfile";
import CompanyDetails from "src/components/account/CompanyDetails";

const Company = () => (
  <>
    <Grid style={{ margin: "auto" }} container center spacing={3}>
      <Grid style={{ margin: "auto" }} item lg={8} md={6} xs={12}>
        <CompanyDetails />
      </Grid>
    </Grid>
  </>
);

export default Company;
