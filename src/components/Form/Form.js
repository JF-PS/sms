import React, { useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const Form = ({ inputs, sendForm }) => {
  const [form, setForm] = useState({});

  const handleClick = useCallback(() => {
    sendForm(form);
  }, [form, sendForm]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form>
      <section className="accFormWrapper">
        <div className="alignCenter">
          {inputs &&
            inputs.map((input, index) => (
              <TextField
                key={index}
                required
                id={input.label}
                label={input.label}
                name={input.name}
                select={input.select}
                onChange={handleChange}
              >
                {input.select &&
                  input.value.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
            ))}
        </div>
        <div className="alignCenter">
          <Button
            variant="contained"
            onClick={handleClick}
            size="medium"
            type="button"
          >
            Submit
          </Button>
        </div>
      </section>
    </form>
  );
};

export default Form;
