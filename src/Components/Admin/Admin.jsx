import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Topic } from "@mui/icons-material";
import axios from "../../http/api"

export default function Admin() {

    const [data, setData] = React.useState([])
    const fetchData = async () => {
        try{
            //api enter here
            const res = await axios.get("/topics/list");
            setData(res);
        }
        catch(err){
            console.log(err.message)
        }
    }

    React.useEffect(() => {
        fetchData();
    }, [])

   

  
//   const handleSolve = async (id) => {
//     console.log("id is ",id);

//     if(!token)return;
    
//     setDisabled(true);


//     try {
//       const res = await axios.post("/topics/solved/", {
//         id: id,
//       });
//       console.log(res)
//     } catch (err) {
//       console.log(err.message)
//     }

//     setDisabled(false);
//   };


//   React.useEffect(() => {
//     let res = localStorage.getItem("accessToken");
//     if (res) {
//       setToken(res);
//     }
//   }, []);



   
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell key={1} align="center" width="30%">
              UserId
            </TableCell>
            <TableCell key={2} align="center" width="30%">
              Email
            </TableCell>
            <TableCell key={3} align="center" width="30%">
              IsActive
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <div className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            
            {data.map(({userId, email, isActive}, idx) => {
              return (
                <TableRow>
                  <TableCell align="center" width="30%">
                  {userId}
                </TableCell>
                <TableCell align="center" width="30%">
                  {userId}
                </TableCell>
                <TableCell align="center" width="30%">
                  {userId}
                </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}
