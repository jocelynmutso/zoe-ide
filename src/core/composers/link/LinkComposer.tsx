import React from 'react';
import { makeStyles, createStyles, Theme, TextField, InputLabel, FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { API } from '../../deps';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      margin: theme.spacing(1),
      minWidth: '15ch',
      backgroundColor: theme.palette.background.paper
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '50ch',
      backgroundColor: theme.palette.background.paper
    },
    heading: {
      fontWeight: 'bold',
    },
  }),
);

interface LinkComposerProps {
  site: API.CMS.Site,

}


const LinkComposer: React.FC<LinkComposerProps> = ({ site }) => {
  const classes = useStyles();
  const [type, setType] = React.useState('');
  const [locale, setLocale] = React.useState('');

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const handleLocaleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocale(event.target.value as string);
  };



  return (
    <Typography className={classes.heading}>
      <FormControl variant="outlined" className={classes.select}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={handleTypeChange}
          label="Type"
        >
          <MenuItem value={10}>Internal</MenuItem>
          <MenuItem value={20}>External</MenuItem>
        </Select>
      </FormControl >
      <FormControl variant="outlined" className={classes.select}>
        <InputLabel>Locale</InputLabel>
        <Select
          value={locale}
          onChange={handleLocaleChange}
          label="locale"
        >
          <MenuItem value={10}>EN</MenuItem>
          <MenuItem value={20}>FI</MenuItem>
          <MenuItem value={20}>SV</MenuItem>
        </Select>
      </FormControl >

      <TextField className={classes.formControl} label="Description" variant="outlined" helperText="Text that the user will see" />
      <TextField className={classes.formControl} label="Value" variant="outlined" helperText="URL / path of link (http://www.example.com)" />
    </Typography>
  );
}

export { LinkComposer }