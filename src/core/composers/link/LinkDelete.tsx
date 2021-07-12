import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles, createStyles, Theme, ListItem, IconButton } from '@material-ui/core';

import { API } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
     // padding: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      fontWeight: 'bold',
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.background.paper,
        fontWeight: 'bold'
      }
    },
    margin: {
      marginRight: theme.spacing(1)
    },
    iconButton: {
      padding: 2,
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }),
);


interface LinkDeleteProps {
  site: API.CMS.Site;
  link: API.CMS.Link; 
}

const LinkDelete: React.FC<LinkDeleteProps> = ({ site, link }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.margin}>
      <IconButton className={classes.iconButton} onClick={handleClickOpen}>
        <DeleteOutlinedIcon />
      </IconButton>
      
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Permanently delete this link?"} </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ListItem>* Deleting this link will remove it globally from the application.</ListItem>
            <ListItem>* This action cannot be undone! </ListItem>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Continue and remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export { LinkDelete }