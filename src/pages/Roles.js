import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import RolesDetails from "src/components/account/RolesDetails";

const Privileges = () => (
  <>
    <Grid style={{ margin: "auto" }} container center spacing={3}>
      <Grid style={{ margin: "auto" }} item lg={8} md={6} xs={12}>
        <RolesDetails />
      </Grid>
    </Grid>
  </>
);

export default Privileges;
