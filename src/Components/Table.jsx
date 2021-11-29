import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";
import Checkbox from "@mui/material/Checkbox";
import axios from "../http/api";
import { Topic } from "@mui/icons-material";

export default function BasicTable({ topics ,token, setToken, expanded}) {
  console.log(topics);

  const [disabled, setDisabled] = React.useState(false);
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    setReload(expanded);
  }, [expanded])

  const handleSolve = async (id) => {
    console.log("id is ",id);

    if(!token)return;
    
    setDisabled(true);


    try {
      const res = await axios.post("/topics/solved/", {
        id: id,
      });
      console.log(res)
    } catch (err) {
      console.log(err.message)
    }

    setDisabled(false);
  };

  React.useEffect(() => {
    let res = localStorage.getItem("accessToken");
    if (res) {
      setToken(res);
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell key={1} align="left" width="40%">
              Topic
            </TableCell>
            <TableCell key={2} align="center" width="12%">
              Resources
            </TableCell>
            <TableCell key={3} align="center" width="12%">
              Problems
            </TableCell>
            <TableCell key={4} align="center" width="12%">
              Templates
            </TableCell>
            <TableCell key={5} align="center" width="12%">
              Difficulty
            </TableCell>
            <TableCell key={5} align="center" width="12%">
              Solved
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <div className="table">
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
                <TableCell align="center" width="12%">
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
                <TableCell align="center" width="12%">
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
                <TableCell align="center" width="12%">
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
                <TableCell align="center" width="12%">
                  {topic.difficulty}
                </TableCell>
                <TableCell align="center" width="12%">
                    <Checkbox key={topic.id}
                      onClick={(e) => {
                        handleSolve(topic.id);
                      }}
                      defaultChecked={topic.solved}
                      color="success"
                    />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}
