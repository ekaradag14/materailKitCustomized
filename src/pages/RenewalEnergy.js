import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "src/components/account/AccountProfile";
import RenewalEnergyDetails from "src/components/account/RenewalEnergyDetails";

const RenewalEnergy = () => (
  <>
    <Grid style={{ margin: "auto" }} container center spacing={3}>
      <Grid style={{ margin: "auto" }} item lg={8} md={6} xs={12}>
        <RenewalEnergyDetails />
      </Grid>
    </Grid>
  </>
);

export default RenewalEnergy;
