"use client";

import React, { useEffect } from "react";
import StartInterview from "./components/StartInterview";
import { useParams } from "next/navigation";
import { useInterviewStore } from "./stores/useInterviewStore";

const App: React.FC = () => {
  const { id } = useParams();
  const { loadInterview } = useInterviewStore();
  useEffect(() => {
    if (id) {
      console.log("xxxxxxxxxxxxx", id);

      loadInterview(id as string);
    }
  }, [id, loadInterview]);

  return (
    <div>
      <StartInterview />
    </div>
  );
};

export default App;
