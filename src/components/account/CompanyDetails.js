import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addItem } from "src/actions";
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
import theme from "src/theme";
const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

const CompanyDetails = (props) => {
  const [values, setValues] = useState({
    name: "",
  });
  const [informText, setInformText] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const saveCompany = async () => {
    setSaving(true);
    let company;
    try {
      company = await axios.post("http://3.65.109.190/api/v1/company", values, {
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
    props.dispatch(addItem("company", company.data.data));
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
                helperText="Please specify the company name"
                label="Company Name"
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
            onClick={saveCompany}
          >
            Save company
          </Button>
        </Box>
      </Card>
    </form>
  );
};
const mapStateToProps = (state) => ({
  data: state.projectData,
});
export default connect(mapStateToProps)(CompanyDetails);
