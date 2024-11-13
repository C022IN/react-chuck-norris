import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide"; 
import { useRouter } from "next/router";
import * as React from "react";
import { useAuth } from "../../auth/context/AuthContext";
import Image from "next/image";
import ChuckLogo from "/public/Chuck.jpeg";
import ChuckyProfile from "/public/Chucky.png"; 

interface Page {
  title: string;
  route: string;
}

const pages: Page[] = [
  { title: "Home", route: "/" },
  { title: "Colors", route: "/colors" },
  { title: "Favorites", route: "/favorites" },
  { title: "Cute Cats", route: "/cats" },
  { title: "Custom Jokes", route: "/customJoke" },
];

function ChucksAppBar() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [animateMenu, setAnimateMenu] = React.useState(false);

  React.useEffect(() => {
    setAnimateMenu(true); // Trigger animation when component mounts
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const onPageNavClick = (page: Page) => () => {
    setAnchorElNav(null);
    router.push(page.route);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(90deg, #3f51b5, #2196f3)", color: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ paddingX: 2 }}>
          <Slide in={animateMenu} direction="right" timeout={2000}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <Image src={ChuckLogo} alt="Chuck Logo" width={40} height={40} style={{ borderRadius: "50%" }} />
            </Box>
          </Slide>

          <Slide in={animateMenu} direction="right" timeout={1600}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Chuckychuck
            </Typography>
          </Slide>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page, index) => (
                <Slide
                  key={page.route}
                  in={animateMenu}
                  direction="left"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <MenuItem onClick={onPageNavClick(page)}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Slide>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Slide
                key={page.route}
                in={animateMenu}
                direction="down"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Button
                  onClick={onPageNavClick(page)}
                  sx={{
                    my: 2,
                    color: "black",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 500,
                    textTransform: "none",
                    display: "block",
                    background: "linear-gradient(145deg, #b0b0b0, #dcdcdc)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    borderRadius: 1,
                    padding: "8px 16px",
                    marginX: 1,
                    "&:hover": {
                      background: "linear-gradient(145deg, #d0d0d0, #e8e8e8)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {page.title}
                </Button>
              </Slide>
            ))}
          </Box>

          <Slide in={animateMenu} direction="left" timeout={2000}>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={`Logged in as ${user?.email || "User"}`}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* Replacing Avatar with Chucky Profile Image */}
                  <Image src={ChuckyProfile} alt="User Profile" width={40} height={40} style={{ borderRadius: "50%" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={onLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Slide>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ChucksAppBar;
