import * as React from 'react';
import { Unmissable } from "@/app/models/Unmissable";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
  unmissables: Unmissable[];
  theme: "dark" | "light";
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Unmissables({ unmissables, theme }: Props) {
  return (
    <div style={{width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.08)'}}>
       {unmissables.length > 0 ? 
        (
          <div>
            <p className=" text-sm text-center p-5">Todavia sin comprar por el cliente</p>
            {unmissables.map((row, index) => ( 
                <div key={index}>
                    <Card className='p-2 m-2'>
                      <CardHeader
                        avatar={
                          <Avatar alt={row.label} src={row.img} />
                        }
                        
                        title={
                            <Typography variant="body1" color="text.primary">
                            {row.label}
                            </Typography>
                        }
                        subheader={
                            <div style={{ display: "flex", flexWrap: "wrap"}}>
                                {row.skus.map((sku, index) => (
                                    <React.Fragment key={index}>
                                    <Typography variant="body1" color="text.secondary">
                                    {sku}
                                    </Typography>
                                    {index < row.skus.length - 1 && (
                                    <Typography variant="body1" color="text.secondary">
                                        &nbsp; 
                                    </Typography>
                                    )}
                                    {index % 4 === 3 && <br />}
                                </React.Fragment>
                                ))}
                            </div>
                        }
                      />
                    </Card>
                </div>
              ))}
          </div>
        )
        :
        (
          <div>
             <p className=" text-sm text-center p-10">No tiene Imperdibles por completar</p>
          </div>
        )
        }
    </div>
  );
}
