import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";

export default function BasicTable({ topics }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell key={1} align="left" width="40%">
              Topic
            </TableCell>
            <TableCell key={2} align="center" width="15%">
              Resources
            </TableCell>
            <TableCell key={3} align="center" width="15%">
              Problems
            </TableCell>
            <TableCell key={4} align="center" width="15%">
              Templates
            </TableCell>
            <TableCell key={5} align="center" width="15%">
              Difficullty
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <div className= "table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {topics.map((topic, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" width="40%">
                  {topic.title}
                </TableCell>
                <TableCell align="center" width="15%">
                  <div className="horizontal">
                    {topic.resources.map((resource, i) => {
                      return (
                        <>
                          <div key={i} className="element">
                            <a href={resource.link} target="blank">
                              {i + 1}
                            </a>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell align="center" width="15%">
                  <div className="horizontal">
                    {topic.problems.map((problem, i) => {
                      return (
                        <div key={i} className="element">
                          <a href={problem.link} target="blank">
                            {i + 1}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell align="center" width="15%">
                  <div className="horizontal">
                    {topic.templates.map((template, i) => {
                      return (
                        <div key={i} className="element">
                          <a href={template.link} target="blank">
                            {i + 1}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell align="center" width="15%">
                  {topic.difficulty}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}
