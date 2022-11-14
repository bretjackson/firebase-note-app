import { Box, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../config/firebase";


type Props = {};

const Reset = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <div>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="email"
                label="E-mail Address"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
            />
        </Box>
        <Button variant="contained" onClick={() => sendPasswordReset(email)}>Send password reset email</Button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
    </div>
  );
}
export default Reset;