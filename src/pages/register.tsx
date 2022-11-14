import { Box, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "../config/firebase";

type Props = {};

const Register = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    // if (loading) {
    //   setShowLoading(true);
    //   return;
    // }
    if (user){
      setShowLoading(false);
      navigate("/home");
    }
  }, [user, loading]);

//   if (showLoading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", padding: 50 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

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
                id="name"
                label="Full name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                id="email"
                label="E-mail Address"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                id="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
            />
        </Box>
        <Button variant="contained" onClick={register}>Register</Button>
        
        Already have an account? <Link to="/">Login</Link> now.
    </div>
  );
}
export default Register;