let mylocalStorage = JSON.parse(localStorage.getItem("data")) || [];
const checkLocalStorage = function () {
  if (mylocalStorage) {
    mylocalStorage.forEach(function (x) {
      $("ol").append(`<li><input type='checkbox' id='${x.id}'>${x.value}</li>`);
    });
  }
};
checkLocalStorage();

const updateLocalStorage = function () {
  localStorage.setItem("data", JSON.stringify(mylocalStorage));
};

const addItem = function () {
  const inputBox = $("input:text").val();
  const timeId = new Date().getTime();
  if (!inputBox.trim()) {
    alert("There is nothing to add!");
  } else {
    $("ol").append(
      `<li><input type='checkbox' id='${timeId}'>${inputBox}</li>`
    );
    $("input:text").val("");
    // Local Storage
    mylocalStorage.push({
      id: `${timeId}`,
      value: inputBox,
    });
    updateLocalStorage();
  }
};

$(document).ready(function () {
  // Add item on click
  $("#addItem").click(addItem);
  // Add item after pressing Enter key
  $("input:text").keyup(function (event) {
    if (event.keyCode === 13) {
      addItem();
    }
  });
  // Remove item after the checkbox is clicked
  $(document).on("click", "input:checkbox", function () {
    $(this).parent().addClass("strike").fadeOut("slow");
    let selectedItem = event.target.id;
    mylocalStorage = mylocalStorage.filter(function (x) {
      return x.id !== selectedItem;
    });
    updateLocalStorage();
    // alert when all tasks are completed
    let x = $("ol").children(":visible").length;
    if (x === 1) {
      // delay for alert
      setTimeout(function () {
        alert("You have done everything!");
      }, 1000);
    }
  });
  // Drag & Drop (jQuery UI)
  $("ol").sortable();
});
