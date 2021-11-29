import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "../../http/api";

export default function BasicTextFields() {
  const [data, setData] = React.useState({
    title: "",
    feedback: "",
  });

  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setError("");
  }, [data.feedback]);

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.feedback == "") {
      console.log(data.feedback);
      setError("*Kindly fill out the Feedback");
      return;
    }

    try {
      const res = await axios.post("topics/feedback/create/", data);
      console.log(res.data);
      window.location.pathname="/";

    } catch (err) {
      console.error(err.message);
      setError("Please Login In to submit the Feedback");
    }

  };

  const handleChange = (e) => {
    const data = e.target.value;
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="Title"
        label="Title"
        onChange={handleChange}
        multiline
        rows={1}
        value={data.title}
        name="title"
      />
      <br />
      <TextField
        id="Feedback"
        label="Feedback"
        multiline
        rows={4}
        onChange={handleChange}
        value={data.feedback}
        name="feedback"
      />
      <br />
      <div
        style={{
          textAlign: "left",
          color: "red",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "-6px",
          fontSize: "13px",
          width: "30%",
          fontFamily: "monospace sans-serif",
        }}
      >
        {error}
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </Box>
  );
}
