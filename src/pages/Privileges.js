import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import PrivilegesDetails from "src/components/account/PrivilegesDetails";

const Privileges = () => (
  <>
    <Grid style={{ margin: "auto" }} container center spacing={3}>
      <Grid style={{ margin: "auto" }} item lg={8} md={6} xs={12}>
        <PrivilegesDetails />
      </Grid>
    </Grid>
  </>
);

export default Privileges;
