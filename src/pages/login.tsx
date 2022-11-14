import { Box, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {};

const Login = (props: Props) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState<boolean>(false);

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
        <Button variant="contained" onClick={() => logInWithEmailAndPassword(email, password)}>Login</Button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
    </div>
  );
}
export default Login;