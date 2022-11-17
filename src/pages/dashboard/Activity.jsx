import Title from "./Title";
import React from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';

const Activity = (props) => {

  const token = localStorage.getItem("user_token");
  const user = jwt_decode(token).data.firstName;
  
  return (
    <React.Fragment>
      <Title>Recent Activity</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Activity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.activity.map((activity, index) => (
            <TableRow key={index}>
              <TableCell>{activity.createdAt.slice(0, 10)}</TableCell>
              <TableCell>{
              activity.interestRate ?
              (
                <div>
                  <Link style={{textDecoration: "none"}} to={`/calculator/${activity.projectName}`}>
                    <CalculateRoundedIcon />
                    {`CREATED CALCULATOR FOR ${activity.projectName}`}
                  </Link>
                </div>
              )
              :
              (
                <div>
                  <VisibilityRoundedIcon />
                  {`ADDED ${activity.projectName} TO WATCHLIST`}
                </div>
              )
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default Activity;