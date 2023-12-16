var items_arr = [];

function addToList() {
  let items = document.getElementById("task").value.toString();
  if (items) {
    items_arr = sessionStorage.getItem("task_arr")
      ? JSON.parse(sessionStorage.getItem("task_arr"))
      : [];
    const uuid = crypto.randomUUID();
    items_arr.push({ item: items, uuid: uuid });
    sessionStorage.setItem("task_arr", JSON.stringify(items_arr));
    document.getElementById("task").value = "";
    listItems(items, uuid);
  }
}

function listItems(items, uuid) {
  const taskContainer = document.createElement("div");
  taskContainer.id = `${uuid}`;
  taskContainer.style.cssText =
    "padding: 10px; background-color: Fuchsia; color: white; margin-top: 5px; border-radius: 4px;";

  const taskData = document.createElement("span");
  taskData.innerHTML = items;
  taskContainer.appendChild(taskData);

  const editButton = document.createElement("i");
  const deleteButton = document.createElement("i");

  editButton.className = "fas fa-edit";
  editButton.style.cssText =
    "float: right; cursor: pointer; position: relative; right: 5px;";

  deleteButton.className = "fas fa-trash";
  deleteButton.style.cssText =
    "float: right; cursor: pointer; position: relative; left: 2px;";

  editButton.addEventListener("click", function () {
    var inputChecker = taskContainer.getElementsByTagName("input");
    if (inputChecker?.[0]?.style?.color != "white") {
      const editContent = document.createElement("input");
      const editDone = document.createElement("button");

      editContent.style.cssText =
        "background-color: Fuchsia; color: white; border: 1px solid goldenrod; border-radius: 5px; padding: 5px; margin-top: 5px;";
      editContent.value = items;

      editDone.style.cssText =
        "background-color: goldenrod;color: white;border: none; padding: 5px; border-radius: 3px; margin-left: 4px; cursor: pointer;";
      editDone.innerHTML = "Done";

      editDone.addEventListener("click", function () {
        taskData.innerHTML = editContent.value;
        editContent.remove();
        editDone.remove();
        items_arr = JSON.parse(sessionStorage.getItem("task_arr"));
        for (let i = 0; i < items_arr.length; i++) {
          if (items_arr[i].uuid === taskContainer.id) {
            items_arr[i].item = editContent.value;
            sessionStorage.setItem("task_arr", JSON.stringify(items_arr));
            break;
          }
        }
      });

      taskContainer.appendChild(editContent);
      taskContainer.appendChild(editDone);
    }
  });

  deleteButton.addEventListener("click", function () {
    taskContainer.remove();
    items_arr = JSON.parse(sessionStorage.getItem("task_arr"));
    for (let i = 0; i < items_arr.length; i++) {
      if (items_arr[i].uuid === taskContainer.id) {
        items_arr.splice(i, 1);
        sessionStorage.setItem("task_arr", JSON.stringify(items_arr));
        break;
      }
    }
    sessionStorage.setItem("task_arr", JSON.stringify(items_arr));
  });

  taskContainer.appendChild(deleteButton);
  taskContainer.appendChild(editButton);
  document.getElementById("list-data").appendChild(taskContainer);
}

function toggleTheme() {
  var themeIcon = document.getElementById("themeIcon");
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeIcon.className = "fas fa-moon";
  } else {
    themeIcon.className = "fas fa-sun";
  }
}

window.onload = function () {
  items_arr = sessionStorage.getItem("task_arr")
    ? JSON.parse(sessionStorage.getItem("task_arr"))
    : [];

  if (items_arr.length > 0) {
    for (let item of items_arr) {
      listItems(item.item, item.uuid);
    }
  }
};
``
