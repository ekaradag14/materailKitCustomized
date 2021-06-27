import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Grid,
  Toolbar,
} from "@material-ui/core";
// import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "./Logo";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  let navigate = useNavigate();

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Grid >
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => {
              sessionStorage.removeItem("publicsector");
              sessionStorage.removeItem("publicinstitution");
              sessionStorage.removeItem("privilege");
              sessionStorage.removeItem("dashboardStats");
              sessionStorage.removeItem("roles");
              sessionStorage.removeItem("company");
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("energysource");
              sessionStorage.removeItem("AuthToken");
              navigate("/login", { replace: true });
            }}
          >
            <InputIcon />
          </IconButton>
        </Grid>
        <Grid >
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
