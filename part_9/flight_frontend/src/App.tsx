import DairyForm from "./components/DairyForm";
import Content from "./components/Content";
import DairyService from "./services/DairyService";
import { useState, useEffect } from "react";
import { DiaryEntry } from "./types/types";
function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    DairyService.getAll().then(data => {
      setEntries(data);
    });
  }, []);
  return (
    <div>
      <h1>Flight App</h1>
      <DairyForm />
      <Content entries={entries} />
    </div>
  )
}

export default App
