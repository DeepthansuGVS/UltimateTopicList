import React, { useState, useEffect } from "react";

function usePasswordValidator(config = { min: 6, max: 10 }) {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
  
    useEffect(
      () => {
        setPasswordError("");
        if (!password) return;
  
        if (password.length < config.min) {
          setPasswordError(`Password must be at least ${config.min} characters.`);
        } else if (password.length > config.max) {
          setPasswordError(
            `Password must be less than ${config.max} characters.`
          );
        }
      },
      [password]
    );
  
    return [password, setPassword, passwordError];
  }
  
export default usePasswordValidator;