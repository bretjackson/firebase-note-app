import { logout } from "../config/firebase";
import { Button } from "@mui/material";

type Props = { children: any };

const Layout = (props: Props) => {
  return (
    <div>
      <nav>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#fafafa",
            padding: 10,
          }}
        >
          {"Note App "}
        </div>
        <Button color="inherit" onClick={logout}>Logout</Button> :
      </nav>
      <div style={{ height: "100vh" }}>{props.children}</div>
    </div>
  );
};

export default Layout;
