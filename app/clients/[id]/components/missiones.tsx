import * as React from 'react';
import { Mission } from "@/app/models/Mission";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


type Props = {
  missions: Mission[];
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


export default function Missiones({ missions, theme }: Props) {

    const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.08)'}}>
      {missions.length > 0 ? 
      (
        <div>
          <p className=" text-sm text-center p-5">Resumen avance del Cliente</p>
        {missions.map((row, index) => ( 
            <div key={index} style={{width: '100%'}}>
                <Card className='p-2 m-2'>
                  <CardHeader
                    avatar={
                      <Avatar alt={row.label} src={row.img} />
                    }
                    action={
                        <Typography variant="body1" color="text.secondary"> {row.qty} / {row.target}
                        </Typography>
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

      ):(
        <div>
           <p className=" text-sm text-center p-10">No tiene Misiones por completar</p>
        </div>
      )}
      

    </div>
  );
}
