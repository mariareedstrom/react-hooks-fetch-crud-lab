import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // when page renders, get questions
  // GET
  // set questions in state
  // pass to QuestionList then create QuestionItem

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((data) => setQuestions(data));
  }, []);

  function addQuestion(newQ) {
    setQuestions([...questions, newQ]);
  }

  function deleteQuestion(id) {
    const updatedQs = questions.filter((q) => q.id !== id);
    setQuestions(updatedQs);
  }

  if (!questions) return <h2>Questions Loading... </h2>;

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onSubmitQuestion={addQuestion} />
      ) : (
        <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} />
      )}
    </main>
  );
}

export default App;
