import React from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityOnIcon from '@material-ui/icons/Visibility';

import { LocalesOverview } from './LocalesOverview';
import { LocaleDisable } from './LocaleDisable';
import { API } from '../../deps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    bold: {
      fontWeight: 'bold'
    },
  }));

const useRowStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      '& > *': {
        paddingLeft: 15
      },
    },
    table: {
      paddingLeft: "10px",
      margin: theme.spacing(2)
    },
    bold: {
      fontWeight: 'bold',
      borderBottom: 'unset'
    },
    column: {
      width: '25%',
      fontWeight: 'bold',
      borderBottom: 'unset',
      padding: 0
    },
    tableCell: {
      paddingTop: 0,
      paddingBottom: 0
    },
    iconButton: {
      padding: 2,
      color: theme.palette.primary.dark,
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.background.paper,
        "& .MuiSvgIcon-root": {
          color: theme.palette.background.paper,
        }
      }
    },
  }));


interface LocalesViewProps {
  site: API.CMS.Site,

}

const LocalesView: React.FC<LocalesViewProps> = ({ site }) => {
  const classes = useStyles();

  const locales = Object.values(site.locales);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.bold} align="left">Locale</TableCell>
              <TableCell className={classes.bold} align="left">Status</TableCell>
              <TableCell className={classes.bold} align="left">Note</TableCell>
              <TableCell className={classes.bold} align="left">Disable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locales.map((locale, index) => (<Row site={site} locale={locale} />))}
          </TableBody>
        </Table>
      </TableContainer>
      <LocalesOverview site={site} />
    </>
  );
}

interface RowProps {
  site: API.CMS.Site,
  locale: API.CMS.SiteLocale,
}

const Row: React.FC<RowProps> = ({ site, locale }) => {
  const classes = useRowStyles();

  return (
    <>
      <TableRow key={locale.id} hover className={classes.row}>
        <TableCell className={classes.tableCell} align="left">{locale.value}</TableCell>
        <TableCell className={classes.tableCell} align="left">
          {locale.enabled ?
            <IconButton className={classes.iconButton}> <VisibilityOnIcon /></IconButton>
            : <IconButton className={classes.iconButton}><VisibilityOffIcon /></IconButton>}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">{locale.note}</TableCell>
        <TableCell className={classes.tableCell} align="left">
          <LocaleDisable site={site} locale={locale} />
        </TableCell>

      </TableRow>
    </>
  )
}

export { LocalesView }



