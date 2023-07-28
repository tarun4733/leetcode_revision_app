
const questionsArray = localStorage.getItem('questions') ? JSON.parse(localStorage.getItem('questions')) : [];

document.querySelector("#enter").addEventListener("click", () => {
  const questionInput = document.querySelector("#question");
  const categoryInput = document.querySelector("#category").value;
  createQuestion(questionInput, categoryInput);
});

document.querySelector("#question").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const questionInput = document.querySelector("#question");
    const categoryInput = document.querySelector("#category").value;
    createQuestion(questionInput, categoryInput);
  }
});

function displayDate() {
  let date = new Date().toLocaleDateString();
  document.querySelector("#date").textContent = date;
}

function displayQuestions() {
    let questions = "";
    for (let i = 0; i < questionsArray.length; i++) {
      let questionColor = "";
    
   
      const totalQuestions = questionsArray.length;
  const completedQuestions = questionsArray.filter(question => question.category === "completed").length;
  const remainingQuestions = totalQuestions - completedQuestions;

  document.getElementById('question-count').innerHTML = remainingQuestions;
      // Extract the question name from the link
      const questionName = extractQuestionName(questionsArray[i].question);
  
      questions += `<div class="item">
                      <div class="input-controller">
                        <textarea disabled style="background-color: ${questionColor};">${questionName}</textarea>
                        <p>Date: ${questionsArray[i].date}</p>
                        <p>Time: ${questionsArray[i].time}</p>
                        <p>Category: ${questionsArray[i].category}</p>
                        <div class="edit-controller">
                          <i class="fa-solid fa-check deleteBtn"></i>
                          <i class="fa-solid fa-pen-to-square editBtn"></i>
                          <button class="viewBtn" onclick="openQuestionLink('${questionsArray[i].question}')">View Question</button>
                        </div>
                      </div>
                      <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                      </div>
                    </div>`;
    }
    document.querySelector(".question-list").innerHTML = questions;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
  }
  
  
  function openQuestionLink(link) {
    window.open(link, '_blank');
  }
  

function createQuestion(questionInput, categoryInput) {
  const newQuestion = {
    question: questionInput.value,
    category: categoryInput,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  };
  questionsArray.push(newQuestion);
  localStorage.setItem('questions', JSON.stringify(questionsArray));
  displayQuestions();
}

function activateDeleteListeners() {
  let deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((deleteBtn, i) => {
    deleteBtn.addEventListener("click", () => { deleteItem(i) });
  });
}

function activateEditListeners() {
  let editBtns = document.querySelectorAll(".editBtn");
  let updateControllers = document.querySelectorAll(".update-controller");
  let inputs = document.querySelectorAll(".input-controller textarea");
  editBtns.forEach((editBtn, i) => {
    editBtn.addEventListener("click", () => { 
      updateControllers[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function activateSaveListeners() {
  let saveBtns = document.querySelectorAll(".saveBtn");
  let inputs = document.querySelectorAll(".input-controller textarea");
  saveBtns.forEach((saveBtn, i) => {
    saveBtn.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

function activateCancelListeners() {
  let cancelBtns = document.querySelectorAll(".cancelBtn");
  let updateControllers = document.querySelectorAll(".update-controller");
  let inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtns.forEach((cancelBtn, i) => {
    cancelBtn.addEventListener("click", () => {
      updateControllers[i].style.display = "none";
      inputs[i].disabled = true;
      inputs[i].style.border = "none";
    });
  });
}

function deleteItem(i) {
  questionsArray.splice(i, 1);
  localStorage.setItem('questions', JSON.stringify(questionsArray));
  displayQuestions();
}

function updateItem(text, i) {
  questionsArray[i].question = text;
  localStorage.setItem('questions', JSON.stringify(questionsArray));
  displayQuestions();
}// ... Existing code ...

function displayCategoryCounts() {
  const doneByMeCount = questionsArray.filter((question) => question.category === "doneByMe").length;
  const algorithmOnlineCount = questionsArray.filter((question) => question.category === "algorithmOnline").length;
  const solutionOnlineCount = questionsArray.filter((question) => question.category === "solutionOnline").length;

  document.getElementById("doneByMeCount").innerText = doneByMeCount;
  document.getElementById("algorithmOnlineCount").innerText = algorithmOnlineCount;
  document.getElementById("solutionOnlineCount").innerText = solutionOnlineCount;
}

function displayQuestionsByCategory(category) {
  const categoryQuestions = questionsArray.filter((question) => question.category === category);
  // Display the questions in the categoryQuestions array
  // (You can use similar logic as the displayQuestions() function)

  // Example: Displaying question names as an alert
  const questionNames = categoryQuestions.map((question) => question.question);
  alert("Questions in " + category + " category:\n" + questionNames.join("\n"));
}

function activateViewAllButtons() {
  const viewAllButtons = document.querySelectorAll(".view-all-btn");
  viewAllButtons.forEach((button) => {
    const category = button.getAttribute("data-category");
    button.addEventListener("click", () => {
      displayQuestionsByCategory(category);
    });
  });
}

function extractQuestionName(link) {
  const parts = link.split('/');
  return parts[parts.length - 2];
}


window.onload = function () {
  
  const storedQuestions = localStorage.getItem('questions');
  if (storedQuestions) {
    questionsArray = JSON.parse(storedQuestions);
  } else {
    questionsArray = [];
  }

  displayQuestions();
  displayCategoryCounts();
  displayQuestionCount(); // Display initial question count
  activateViewAllButtons();
};
