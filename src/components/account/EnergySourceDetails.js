import { useState } from 'react';
import axios from 'axios';
import { addItem } from "src/actions";
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


const EnergySourceDetails = (props) => {
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
  const saveEnergySource = async () => {
    setSaving(true);
    let energySource;
    try {
      energySource = await axios.post(
        "http://3.65.109.190/api/v1/energysource", values,
        {headers: {
          Authorization: sessionStorage.getItem("AuthToken"),
        },}
      );
    } catch (error) {
      console.error(error);
      setInformText("Encountered an error!");
      setSaving(false);
      return
    }
    props.dispatch(addItem("energysource", energySource.data.data));
    setValues({
      name: "",
    });
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
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the energy source"
                label="Energy Source"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
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
          <Button
            disabled={saving}
            color="primary"
            variant="contained"
            onClick={saveEnergySource}
          >
            Save energy source
          </Button>
        </Box>
      </Card>
    </form>
  );
};
const mapStateToProps = (state) => ({
  data: state.projectData,
});
export default connect(mapStateToProps)(EnergySourceDetails);
