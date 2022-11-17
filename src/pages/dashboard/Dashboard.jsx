import {useState, useEffect} from "react";
import Activity from "./Activity";
import Title from './Title';
import userApis from "../../apis/users";
import watchlistApis from "../../apis/watchlist";
import calculatorApis from "../../apis/calculator";
import { Link } from "react-router-dom";
import { CircularProgress, Box, Typography, Container, Grid, Paper, createTheme, ThemeProvider } from "@mui/material";

const mdTheme = createTheme();

const Dashboard = () => {

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const [calculator, setCalculator] = useState([]);

  // Get user's name and date account was created
 
  const token = "Bearer " + localStorage.getItem("user_token");
  useEffect(() => {
    const fetch = async() => {
      const userResponse = await userApis.userDetails(token);
      const watchlistResponse = await watchlistApis.getProjectsWatchedInDetail(token);
      const calculatorResponse = await calculatorApis.getUserCalculators(token);
      setUser(userResponse.data);
      setWatchlist(watchlistResponse.data);
      setCalculator(calculatorResponse.data);
      setLoading(false);
    }

    fetch()
  }, []);
  const joinDate = user.createdAt?.slice(0,10)

  const activity = watchlist.concat(calculator)

  if(loading) {
    return (
      <div style={{ textAlign: "center", margin: "1em"}}>< CircularProgress/></div>
    )
  }

  return (
    <div>
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper variant="outlined" sx={{p: 2, display: 'flex', flexDirection: 'column', height: 240, border: "none", backgroundColor: "rgb(255, 224, 217)" }}>
              <Title>Hello</Title>
                <Typography component="p" variant="h3">
                  {user.firstName}
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                  joined on {joinDate}
                </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height: 240}}>
              <Title>Watchlisted Projects</Title>
                <Typography component="p" variant="h1">
                  {watchlist.length}
                </Typography>
                <Link to="/watchlist">
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    Go to watchlist
                  </Typography>
                </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height: 240}}>
              <Title>Calculator Projects</Title>
                <Typography component="p" variant="h1">
                  {calculator.length}
                </Typography>
                <Link to="/calculator">
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    Go to calculator
                  </Typography>
                </Link>
            </Paper>
          </Grid>
          <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Activity activity={activity}/>
                </Paper>
              </Grid>
        </Grid>
      </Container>
      </Box>
    </ThemeProvider>
    </div>
  )
}

export default Dashboard;

