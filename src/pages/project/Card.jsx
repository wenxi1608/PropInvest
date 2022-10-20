import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  const getProject = [props.results];
  const projectUrl = getProject.toString().replaceAll(" ", "-");
  
  return (
    <Link to={`/projects/${projectUrl}`}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {getProject}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProjectCard;
