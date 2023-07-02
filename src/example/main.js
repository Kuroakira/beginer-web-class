window.onload = function () {
    cleanupDisplay();
    showAllTasks();
}

// 初期画面として一度タスクをすべて削除
function cleanupDisplay() {
    var todoList = document.getElementById('todo-list');
    var clone = todoList.cloneNode(false);
    todoList.parentNode.replaceChild(clone, todoList);
}

// 初期画面としてすでに保存されているタスクを表示
function showAllTasks() {
    for (var i = 0; i < localStorage.length; i++){
        var taskId = localStorage.key(i);
        var taskValue = getTaskFromLocalStorage(taskId);
        addTaskToDisplay(taskId, taskValue);
    }
}

// タスクの追加
function addTask() {
    var taskName = document.getElementById('task-name');

    // タスク名の入力がなければ処理を終了
    if(taskName.value.trim() == "") return;

    var taskId = addTaskToLocalStorage(taskName.value);
    addTaskToDisplay(taskId, taskName.value);
    taskName.value = "";
}

// タスクの削除
function deleteTask(taskId) {
    deleteTaskFromLocalStorage(taskId);
    deleteTaskFromDisplay(taskId);
}

// チェックされたタスクをすべて削除
function deleteCheckedTasks() {
    var inputList = document.task_form.task;
    for(var i=inputList.length-1;i>=0;i--) {
      if(inputList[i].checked){
        var taskId = inputList[i].closest('li').id;
        deleteTaskFromLocalStorage(taskId);
        deleteTaskFromDisplay(taskId);
      }
    }
}

// タスクの画面表示
function addTaskToDisplay(taskId, taskValue) {
    var li = createTaskElementForDisplay(taskId, taskValue);

    // ulにliを追加
    var todoList = document.getElementById('todo-list');
    todoList.appendChild(li);
}

// 画面表示用にタスクの要素を作成
function createTaskElementForDisplay(taskId, taskValue) {
    if (!taskValue) return;

    // liに要素を追加
    var li = document.createElement('li');
    li.id = taskId;

    // liにinputを追加
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'task');
    li.appendChild(input);

    // liにpを追加
    var p = document.createElement('p');
    p.innerHTML = taskValue;
    li.appendChild(p);

    // liにbuttonを追加
    var endButton = createTaskButton('end-button', '完了');
    // 完了ボタンクリック時のイベント定義
    endButton.addEventListener('click', function(e){
        e.preventDefault();
        this.setAttribute('class', 'end-button disabled');
        this.previousElementSibling.setAttribute('class', 'line-through');
    });
    li.appendChild(endButton);

    // liにbuttonを追加
    var deleteButton = createTaskButton('delete-button', '削除');
    // 削除ボタンクリック時のイベント定義
    deleteButton.addEventListener('click', function(e){
        e.preventDefault();
        deleteTask(taskId);
    });
    li.appendChild(deleteButton);

    return li;
}

// 画面表示用にタスク内にあるボタンを作成
function createTaskButton(className, name) {
    var btn = document.createElement('button');
    btn.setAttribute('class', className);
    btn.innerHTML = name;
    return btn;
}

// 画面上から特定タスクの削除
function deleteTaskFromDisplay(taskId) {
    var task = document.getElementById(taskId);
    task.remove();
}

// タスク用のID生成
function getUniqueStr(myStrong){
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)    + Math.floor(strong*Math.random()).toString(16)
}

// タスクをLocalStorageから取得
function getTaskFromLocalStorage(taskId) {
    return localStorage.getItem(taskId);
}

// タスクのLocalStorageへの追加
function addTaskToLocalStorage(taskValue) {
    var taskId = getUniqueStr();
    localStorage.setItem(taskId, taskValue);
    return taskId;
}

// タスクのLocalStorageからの削除
function deleteTaskFromLocalStorage(taskId) {
    localStorage.removeItem(taskId);
}