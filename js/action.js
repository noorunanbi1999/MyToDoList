var taskCnt = 0;
var ele = document.getElementById("tasks");
let prev, timer;

function addTask() {
  const taskDes = document.getElementById("adderInput");
  if (taskDes.value.trim() == "") {
    alertMessage("Task Description cannot be empty");
    taskDes.value = "";
    return;
  }
  taskCnt++;
  if (taskCnt == 1) {
    document.getElementById("taskempty").style.display = "none";
    ele.className = "task";
  }
  var taskEle = document.createElement("div");
  taskEle.id = "taskEle";
  var taskContent = document.createElement("input");
  taskContent.id = "taskContent";
  taskContent.value = taskDes.value;
  taskContent.readOnly = true;
  var completed = document.createElement("button");
  completed.className = "btn";
  completed.innerHTML =
    '<abbr title="Mark as completed"><i class="fa-solid fa-check"></i></abbr>';
  completed.onclick = function () {
    completed.className = "btnCompleted";
    editor.className = "btnCompleted";
    deleted.className = "btnCompleted";
    taskContent.style.textDecoration = "line-through";
    taskContent.style.transition = "color 2s, background-color 2s";
    taskContent.style.background = "green";
    taskContent.style.color = "white";
    taskContent.disabled = true;
    editor.disabled = true;
    completed.disabled = true;
    setTimeout(setDeleteBtn, 2000, deleted);
  };
  var deleted = document.createElement("button");
  deleted.className = "btn";
  deleted.innerHTML =
    '<abbr title="Delete"><i class="fa-solid fa-trash"></i></abbr>';
  deleted.onclick = function () {
    editor.className = "dieBtn";
    completed.className = "dieBtn";
    deleted.className = "dieBtn";
    taskContent.style.transition = "color 2s, background-color 2s";
    taskContent.style.background = "transparent";
    taskContent.style.color = "transparent";
    setTimeout(deleteElement, 2000, ele, taskEle);
  };
  var editor = document.createElement("button");
  editor.className = "btn";
  editor.innerHTML =
    '<abbr title="Edit"><i class="fa-sharp fa-solid fa-pen-to-square"></i></abbr>';
  editor.onclick = function () {
    if (taskContent.readOnly == true) {
      prev = taskContent.value;
      completed.disabled = true;
      deleted.disabled = true;
      taskContent.readOnly = false;
      taskContent.focus();
    } else {
      if (taskContent.value.trim() == "") {
        alertMessage("Task Description cannot be empty");
        taskContent.value = prev;
      }
      taskContent.readOnly = true;
      completed.disabled = false;
      deleted.disabled = false;
    }
  };
  taskEle.appendChild(taskContent);
  taskEle.appendChild(completed);
  taskEle.appendChild(editor);
  taskEle.appendChild(deleted);
  ele.appendChild(taskEle);
  taskDes.value = "";
}

function setDeleteBtn(deleted) {
  deleted.className = "btnDeleted";
}

function alertMessage(msg) {
  document.getElementById("alertMess").innerText = msg;
  try {
    document.getElementById("alertOuterNone").id = "alertOuter";
  } catch (err) {
    return;
  }
  timer = setTimeout(deactivateAlert, 5000);
}

function deactivateAlert() {
  clearTimeout(timer);
  document.getElementById("alertOuter").id = "alertOuterNone";
}

function deleteElement(parent, child) {
  parent.removeChild(child);
  taskCnt--;
  if (taskCnt == 0) {
    document.getElementById("taskempty").style.display = "block";
    ele.className = "notask";
  }
}
