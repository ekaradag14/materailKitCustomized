import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "src/components/account/AccountProfile";
import EnergySourceDetails from "src/components/account/EnergySourceDetails";

const EnergySource = () => (
  <>
    <Grid style={{ margin: "auto" }} container center spacing={3}>
      <Grid style={{ margin: "auto" }} item lg={8} md={6} xs={12}>
        <EnergySourceDetails />
      </Grid>
    </Grid>
  </>
);

export default EnergySource;
