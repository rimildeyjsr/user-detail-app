import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import "./index.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export function UserTable() {
  const [data, setData] = useState([]);

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
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>

                <StyledTableCell>
                  {row.username}
                </StyledTableCell>

                <StyledTableCell>
                  {row.email}
                </StyledTableCell>

                <StyledTableCell>
                  {row.fullAddress}
                </StyledTableCell>

                <StyledTableCell>
                  {row.phone}
                </StyledTableCell>

                <StyledTableCell>
                  {row.website}
                </StyledTableCell>

                <StyledTableCell>
                  {row.company.name}
                </StyledTableCell>

                <StyledTableCell>
                  <Button
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
                </StyledTableCell>
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
