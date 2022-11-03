import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const Activity = (props) => {

  const token = localStorage.getItem("user_token");
  const user = jwt_decode(token).data.firstName;

  console.log(props.activity)

  const sou = props.activity.map(activity => {
   return activity.createdAt
  })
  console.log(sou)

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
                <Link style={{textDecoration: "none"}} to={`/calculator/${activity.projectName}`}>
                  {`CREATED CALCULATOR FOR ${activity.projectName}`}
                </Link>
              )
              :
              (`ADDED ${activity.projectName} TO WATCHLIST`)
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default Activity;