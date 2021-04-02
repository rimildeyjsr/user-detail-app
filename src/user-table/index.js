import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import "./index.css";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1565c0',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export function UserTable() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://jsonplaceholder.typicode.com/users',
      );
      result.data.map((person) => {
        return person.fullAddress = `${person.address.suite}, ${person.address.street}, ${person.address.city} -  ${person.address.zipcode}`;
      });
      setData(result.data);
    }
    fetchData();
  }, []);

  function deleteRow(id) {
    let newData = data.filter((person) => {
      return person.id !== id;
    });
    setData(newData);
  }

  const classes = useStyles();
  const rowClasses = useRowStyles();

  return(
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell>
              Name
            </StyledTableCell>

            <StyledTableCell>
              Username
            </StyledTableCell>

            <StyledTableCell>
              Email
            </StyledTableCell>

            <StyledTableCell>
              Address
            </StyledTableCell>

            <StyledTableCell>
              Phone
            </StyledTableCell>

            <StyledTableCell>
              Website
            </StyledTableCell>

            <StyledTableCell>
              Company
            </StyledTableCell>

            <StyledTableCell>
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            data.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow className={rowClasses.root}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>

                  <TableCell>
                    {row.username}
                  </TableCell>

                  <TableCell>
                    {row.email}
                  </TableCell>

                  <TableCell>
                    {row.fullAddress}
                  </TableCell>

                  <TableCell>
                    {row.phone}
                  </TableCell>

                  <TableCell>
                    {row.website}
                  </TableCell>

                  <TableCell>
                    {row.company.name}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => setOpen(open === row.id ? -1 : row.id)}
                      variant="outlined"
                      size="small"
                      style={
                        {
                          'borderColor': '#1b5e20',
                          'color': '#1b5e20',
                          'margin': '10px'
                        }
                      }
                    >
                      Open
                    </Button>
                    <Button
                      onClick={() => deleteRow(row.id)}
                      variant="outlined"
                      size="small"
                      style={
                        {
                          'borderColor': '#c63533',
                          'color': '#c63533',
                          'margin': '10px'
                        }
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={8}>
                    <Collapse
                      in={open === row.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <p>
                        Userinfo
                      </p>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
