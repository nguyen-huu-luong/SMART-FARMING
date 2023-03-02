import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((item, index) => {
          let Page = item.component;
          let Layout = Fragment;
          if (item.layout) {
            Layout = item.layout
          }
          return (
            <Route
              key={index}
              path={item.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
