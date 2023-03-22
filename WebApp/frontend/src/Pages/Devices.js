import { Container } from "react-bootstrap";
import StatusBar from "../Components/StatusBar";

function Devices() {
  return (
   <>
        <Container className="p-4 d-flex flex-column w-100 gap-2 h-100">
          <StatusBar title="IoT dashboard" />
    
        </Container>
   </>
  );
}

export default Devices;
