$(document).ready(function () {
  $("#addItem").click(function () {
    var inputBox = $("input:text").val();
    //Input validation (blank string + only whitespaces)
    if (!inputBox.trim()) {
      alert("There is nothing to add!");
    } else {
      $("ol").append("<li>" + "<input type='checkbox'>" + inputBox + "</li>");
      $("input:text").val("");
    }
  });

  // Add item after pressing Enter key
  $("input:text").keyup(function (event) {
    if (event.keyCode == 13) {
      $("#addItem").click();
      $("input:text").val("");
    }
  });

  // Clear the input
  $("input").focus(function () {
    $(this).val("");
  });

  // Remove item after the checkbox is clicked
  $(document).on("click", "input:checkbox", function () {
    $(this).parent().addClass("strike").fadeOut("slow");

    // alert when all tasks are completed
    let x = $("ol").children(":visible").length;
    if (x == 1) {
      // delay for alert
      setTimeout(function () {
        alert("You have done everything!");
      }, 1000);
    }
  });

  // jQuery UI
  // Change the positon of list item with Drag & Drop
  $("ol").sortable();
});
