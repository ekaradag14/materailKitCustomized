import { useState } from 'react';
import axios from 'axios';
import { addItem } from "src/actions";
import Autocomplete from "@material-ui/core/Autocomplete";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const RolesDetails = (props) => {
  const [values, setValues] = useState({
    name: "",
  });
  const [saving, setSaving] = useState(false);
  const [informText, setInformText] = useState(false);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const savePublicSector = async () => {
    setSaving(true);
    let roles;
    try {
      roles = await axios.post("http://3.65.109.190/api/v1/roles", values, {
        headers: {
          Authorization: sessionStorage.getItem("AuthToken"),
        },
      });
    } catch (error) {
      console.error(error);
      setInformText("Encountered an error!");
      setSaving(false);
      return;
    }
    setValues({
      name: "",
    });
    props.dispatch(addItem("roles", roles.data.data));
    setInformText("Successfully Created New Item!");
    setSaving(false);
    setTimeout(() => {
      setInformText(false);
    }, 2000);
  };
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={10} xs={10}>
              <TextField
                fullWidth
                helperText="Please specify the roles"
                label="Roles"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={2}>
              <Button
                disabled={saving}
                style={{ margin: "10px 0" }}
                color="primary"
                variant="contained"
                onClick={savePublicSector}
              >
                Save Role
              </Button>
            </Grid>
          </Grid>
          <Grid container style={{ margin: "10px 0" }} item md={12} xs={12}>
            <Grid item md={6} xs={6}>
              <Typography color="textSecondary" variant="h4">
                Roles
              </Typography>
            </Grid>
            <Grid item md={3} xs={3}>
              <Typography color="textSecondary" variant="h4">
                Privileges
              </Typography>
            </Grid>
          </Grid>

          {props.data.roles &&
            props.data.roles.map((el) => {
              return (
                <Grid
                  container
                  style={{ marginTop: 5 }}
                  spacing={2}
                  item
                  xs={12}
                  md={12}
                >
                  <Grid item md={6} xs={6}>
                    <Typography
                      color="primary"
                      style={{ marginTop: "10px" }}
                      variant="h2"
                    >
                      {el.name}
                    </Typography>
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={props.data.privilege}
                      getOptionLabel={(option) => option.name}
                      value={values.publicinstitution}
                      filterSelectedOptions
                      onChange={(event, values) =>
                        setValues((pS) => ({
                          ...pS,
                          publicinstitution: values,
                        }))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Role Privileges"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <Button
                      fullWidth
                      style={{ height: "55px" }}
                      disabled={saving}
                      color="primary"
                      variant="contained"
                    >
                      Update Role
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
        </CardContent>
        <Divider />
        {informText && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography color="primary" variant="body2">
              {informText}
            </Typography>
          </Box>
        )}
      </Card>
    </form>
  );
};
const mapStateToProps = (state) => ({
  data: state.projectData,
});
export default connect(mapStateToProps)(RolesDetails);
