import Sidebar from "./components/Sidebar";
import PagesWrapper from "./components/PagesWrapper";
import { useState } from "react";

function App() {

  const [renderComponentId, setRenderComponentId] = useState(0);

  return (
    <div className="bg-sky-200 flex flex-row">
      <Sidebar selectOptioner={setRenderComponentId}/>
      <PagesWrapper selectedForm={renderComponentId}/>
    </div>
  );
}

export default App;
