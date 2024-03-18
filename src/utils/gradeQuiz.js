export function gradeQuiz(quizAnswersObject) {
    let totalQuestions = quizAnswersObject.studentAnswers.length;
    let correctAnswers = 0;
  
    quizAnswersObject.studentAnswers.forEach(answer => {
      if (answer.correctAnswer === answer.chosenAnswer) {
        correctAnswers++;
      }
    });
  
    const score = correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const passed = percentage >= 50; // Assuming passing percentage is 50%
    const failed = !passed;
  
    return { score, percentage, passed, failed };
  };