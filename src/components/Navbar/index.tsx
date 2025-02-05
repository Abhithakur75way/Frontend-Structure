import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Job Huntly
        </Typography>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Display user's name directly in the Navbar */}
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {user.name}
            </Typography>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  minWidth: "200px",
                  padding: "8px",
                },
              }}
            >
              {/* Accessible and non-faded Menu items */}
              <MenuItem  sx={{ opacity: 1, color: "text.primary" }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
              </MenuItem>
              <MenuItem  sx={{ opacity: 1, color: "text.primary" }}>
                <Typography variant="body2">{user.email}</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/change-password")}>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}