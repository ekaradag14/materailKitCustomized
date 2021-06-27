import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addItem } from "src/actions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/core/Autocomplete";
import Select from "@material-ui/core/Select";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

const RenewalEnergyDetails = (props) => {
  const [values, setValues] = useState({});
  const [informText, setInformText] = useState(false);
  const [saving, setSaving] = useState(false);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const saveRenewalEnergy = async () => {
    let reqValues = { ...values };
    if (
      !reqValues.energysource ||
      !reqValues.batteriesInstalled ||
      !reqValues.co2_Avoided ||
      !reqValues.companyId ||
      !reqValues.connections_financial_close ||
      !reqValues.debtMix ||
      !reqValues.installedCapacity ||
      !reqValues.latitude ||
      !reqValues.longitude ||
      !reqValues.publicInstitutionConnected ||
      !reqValues.latitude
    ){
            setInformText("Please fill all the fields!");
            return
    }
      reqValues.energysource &&
        (reqValues.energysource = reqValues.energysource.map((el) => {
          delete el.name;
          return el;
        }));
    reqValues.publicInstitutionConnected &&
      (reqValues.publicInstitutionConnected =
        reqValues.publicInstitutionConnected.map((el) => {
          delete el.name;
          return el;
        }));
    reqValues.batteriesInstalled = parseInt(reqValues.batteriesInstalled);
    reqValues.co2_Avoided = parseInt(reqValues.co2_Avoided);
    reqValues.companyId = parseInt(reqValues.companyId);
    reqValues.connections_financial_close = parseInt(
      reqValues.connections_financial_close
    );
    reqValues.debtMix = Number(reqValues.debtMix);
    reqValues.installedCapacity = Number(reqValues.installedCapacity);
    reqValues.latitude = parseFloat(reqValues.latitude);
    reqValues.longitude = parseFloat(reqValues.longitude);

    // setSaving(true);
    console.log(reqValues);
    let company;

    reqValues.publicSector &&
      (reqValues.publicSector = reqValues.publicSector.map((el) =>
        parseInt(el.id)
      ));

    try {
      company = await axios.post("http://3.65.109.190/api/v1/project", values, {
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

    setInformText("Successfully Created New Item!");
    setSaving(false);
    setTimeout(() => {
      setInformText(false);
    }, 2000);
  };
  const handleSliderChange = (e, n, id) => {
    setValues((pS) => ({
      ...values,
      energysource: pS.energysource.map((el) => {
        el.id === id && (el.percentage = n);
        return el;
      }),
    }));
  };
  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
      style={{ width: "55vw", margin: "auto", marginTop: 20 }}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectName"
                onChange={handleChange}
                required
                value={values.projectName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Company</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="companyId"
                  label="Company"
                  value={values.companyId}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                >
                  {props.data.company &&
                    props.data.company.map((el) => {
                      return (
                        <MenuItem key={el.id} value={el.id}>
                          {el.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={4}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={props.data.publicsector && props.data.publicsector}
                getOptionLabel={(option) => option.name}
                value={values.publicSector}
                filterSelectedOptions
                onChange={(event, values) =>
                  setValues((pS) => ({
                    ...pS,
                    publicSector: values,
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Public Sector"
                    placeholder="Public Sectors"
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={props.data.energysource && props.data.energysource}
                value={values.energysource}
                onChange={(event, values) =>
                  setValues((pS) => ({
                    ...pS,
                    energysource: values.map((el) => {
                      el.percentage = el.percentage ? el.percentage : 20;
                      return el;
                    }),
                  }))
                }
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Energy Sources"
                    placeholder="Energy Sources Used"
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={
                  props.data.publicinstitution && props.data.publicinstitution
                }
                getOptionLabel={(option) => option.name}
                value={values.publicInstitutionConnected}
                filterSelectedOptions
                onChange={(event, values) =>
                  setValues((pS) => ({
                    ...pS,
                    publicInstitutionConnected: values,
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Public Institution"
                    placeholder="Connected Public Institutions"
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <TextField
                id="standard-number"
                label="Batteries Installed"
                type="number"
                fullWidth
                name="batteriesInstalled"
                value={values.batteriesInstalled}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <TextField
                id="standard-number"
                label="CO2 Avoided"
                fullWidth
                type="number"
                name="co2_Avoided"
                value={values.co2_Avoided}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <TextField
                id="standard-number"
                label="Connections Financial Close"
                fullWidth
                type="number"
                name="connections_financial_close"
                value={values.connections_financial_close}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <TextField
                id="standard-number"
                label="Debt Mix"
                fullWidth
                type="number"
                name="debtMix"
                value={values.debtMix}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <TextField
                id="standard-number"
                label="Installed Capacity"
                fullWidth
                type="number"
                name="installedCapacity"
                value={values.installedCapacity}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <TextField
                id="standard-number"
                label="Latitude"
                fullWidth
                type="number"
                name="latitude"
                value={values.latitude}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={4}>
              <TextField
                id="standard-number"
                label="Longitude"
                fullWidth
                type="number"
                name="longitude"
                value={values.longitude}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {values.energysource &&
              values.energysource.map((el) => (
                <Grid key={el.id} item md={4} xs={4}>
                  <InputLabel id="demo-simple-select-label">
                    Use Of {el.name} (%)
                  </InputLabel>

                  <Slider
                    value={el.percentage}
                    onChange={(e, n) => handleSliderChange(e, n, el.id)}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider"
                  />
                </Grid>
              ))}
            {values.publicInstitutionConnected &&
              values.publicInstitutionConnected.map((el, ind) => (
                <Grid key={el.id} item md={4} xs={4}>
                  <TextField
                    id="standard-number"
                    label={`Use Of ${el.name}`}
                    fullWidth
                    type="number"
                    name="longitude"
                    value={values.longitude}
                    onChange={(e) => {
                      let pubIns = [...values.publicInstitutionConnected];
                      pubIns[ind].number = e.target.value;
                      setValues((pS) => ({
                        ...pS,
                        publicInstitutionConnected: pubIns,
                      }));
                    }}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              ))}
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
            onClick={saveRenewalEnergy}
          >
            Save Renewal Energy Project
          </Button>
        </Box>
      </Card>
    </form>
  );
};
const mapStateToProps = (state) => ({
  data: state.projectData,
});
export default connect(mapStateToProps)(RenewalEnergyDetails);
