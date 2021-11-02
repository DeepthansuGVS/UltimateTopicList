import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './style.css'

export default function BasicTable({topics}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Topic</TableCell>
            <TableCell align="left">Resources</TableCell>
            <TableCell align="left">Problems</TableCell>
            <TableCell align="left">Templates</TableCell>
            <TableCell align="left">Difficullty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topics.map((topic) => (
            <TableRow
              key={topic.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {topic.title}
              </TableCell>
              <TableCell align="right">
                    <div className="horizontal">
                      {
                        topic.resources.map((resource,i)=>{
                          return (<> 
                          <div className="element">
                              <a href = {resource.link} target="blank">{i+1}</a>
                            </div>
                          </>)
                      })
                      }
                    </div>
              </TableCell>
              <TableCell align="right">
                    <div className="horizontal">
                      {
                        topic.problems.map((problem,i)=>{
                          return (
                            <div className="element">
                              <a href = {problem.link} target="blank">{i+1}</a>
                            </div>
                          )
                      })
                      }
                    </div>
              </TableCell>
              <TableCell align="right">
                 <div className="horizontal">
                      {
                        topic.templates.map((template,i)=>{
                          return (
                            <div className="element">
                              <a href = {template.link} target="blank">{i+1}</a>
                            </div>
                          )
                      })
                      }
                    </div>
              </TableCell>
              <TableCell align="left">{topic.difficulty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}