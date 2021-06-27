import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "src/components/account/AccountProfile";
import PublicInstitutionDetails from "src/components/account/PublicInstitutionDetails";

const PublicInstitution = () => (
  <>
    <Grid style={{ margin: "auto" }} container center spacing={3}>
      <Grid style={{ margin: "auto" }} item lg={8} md={6} xs={12}>
        <PublicInstitutionDetails />
      </Grid>
    </Grid>
  </>
);

export default PublicInstitution;
