import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion }) {
  // console.log(questions);

  const listQuestions = questions.map((q) => {
    // console.log(q)
    // render QuestionItem for each
    return (
      <QuestionItem
        key={q.id}
        question={q}
        onDeleteQuestion={onDeleteQuestion}
        onAnswerChange={handleAnswerChange}
      />
    );
  });

  function handleAnswerChange(qId, qCorrectIndex) {
    fetch(`http://localhost:4000/questions/${qId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: qCorrectIndex,
      }),
    })
      .then((resp) => resp.json())
      .then(console.log(qCorrectIndex));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{listQuestions}</ul>
    </section>
  );
}

export default QuestionList;
