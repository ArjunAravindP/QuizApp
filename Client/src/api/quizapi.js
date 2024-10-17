export async function fetchQuizData(numQuestions, selectedTopic) {
  let topic;
  switch (selectedTopic) {
    case 'Art':
      topic = 25;
      break;
    case 'Science':
      topic = 18;
      break;
    case 'Politics':
      topic = 24;
      break;
    case 'General':
      topic = 9;
      break;
    case 'Filim':
      topic = 11;
      break;
    case 'Books':
      topic = 10;
      break;
    case 'Mathematics':
      topic = 19;
      break;
    case 'History':
      topic = 23;
      break;
    case 'Animals':
      topic = 27;
      break;
    default:
      topic = 9;
      break;
  }
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${numQuestions}&category=${topic}&type=multiple`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results) throw new Error('No results found');

    const array = data.results.map((item) => ({
      question: item.question,
      options: [item.correct_answer, ...item.incorrect_answers].sort(
        () => Math.random() - 0.5
      ),
      answer: item.correct_answer,
      selectedAns: null,
    }));

    return array;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return [];
  }
}
