import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from '@mui/material';

const ProjectCard = (props) => {
  const getProject = [props.results];
  const projectUrl = getProject.toString().replaceAll(" ", "-");
  
  return (
    <Link to={`/projects/${projectUrl}`} style={{textDecoration: "none"}}>
      <Card sx={{ minWidth: 275 }} className="card">
        <CardContent className="card-content">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {getProject}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProjectCard;
