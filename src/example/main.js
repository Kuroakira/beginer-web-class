var todoList;
window.onload = function () {
    todoList = document.getElementById('todo-list');
}

// タスク追加
function addTask() {
    var taskName = document.getElementById('task-name');

    // タスク名の入力がなければ処理を終了
    if(taskName.value.trim() == "") return;

    // タスクをIDと一緒にLocalStorageに格納
    // var uuid = getUniqueStr();
    // localStorage.setItem(uuid, taskName.value);

    // liに要素を追加
    var li = document.createElement('li');

    // liにinputを追加
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'task');
    li.appendChild(input);

    // liにpを追加
    var p = document.createElement('p');
    p.innerHTML = taskName.value;
    li.appendChild(p);

    // liにbuttonを追加
    var endButton = createTaskButton('end-button', '完了');
    li.appendChild(endButton);

    // liにbuttonを追加
    var deleteButton = createTaskButton('delete-button', '削除');
    li.appendChild(deleteButton);

    // ulにliを追加
    todoList.appendChild(li);

    taskName.value = "";

    // イベント処理
    // 完了ボタンクリック
    endButton.addEventListener('click', function(e){
        e.preventDefault();
        this.setAttribute('class', 'end-button disabled');
        this.previousElementSibling.setAttribute('class', 'line-through');
    });
    // 削除ボタンクリック
    deleteButton.addEventListener('click', function(e){
        e.preventDefault();
        todoList.removeChild(this.closest('li'));
    });
}

// タスク内にあるボタンを作成
function createTaskButton(className, name) {
    var btn = document.createElement('button');
    btn.setAttribute('class', className);
    btn.innerHTML = name;
    return btn;
}

// タスク用のID生成
function getUniqueStr(myStrong){
        var strong = 1000;
        if (myStrong) strong = myStrong;
        return new Date().getTime().toString(16)    + Math.floor(strong*Math.random()).toString(16)
}