// Login
$(() => { 
  async function isUserExist(username) {
    try {
      const response = await fetch(`/user-validate`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error:", err);
      return {};
    }
    }
    
  $("#username").on("blur", async function (e) {
    const value = e.target.value;
    const usernameRgx = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
    if (!value.match(usernameRgx)) {
      $(".error").text("Username phải có ít nhất 3 kí tự");
      $(".error").css("visibility", "visible");
    } else {
      const result = await isUserExist(value);
      if (result.code == 400) {
        $(".error").text(result.message);
        $(".error").css("visibility", "visible");
      } else {
        $(".error").text("");
        $(".error").css("visibility", "hidden");
      }
    }
  });
    
  $("#username").on("focus", async function (e) {
    $(".error").css("visibility", "hidden");
  });
    
  $("#form-login").on("submit", async function (e) {
    e.preventDefault();
    let isValid = false;
    const username = $("#username").val();
    const usernameRgx = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
    if (!username.match(usernameRgx)) {
      $(".error").text("Username phải có ít nhất 3 kí tự");
      $(".error").css("visibility", "visible");
    } else {
      const result = await isUserExist(username);
      if (result.code == 400) {
        $(".error").text(result.message);
        $(".error").css("visibility", "visible");
      } else {
        $(".error").text("");
        $(".error").css("visibility", "hidden");
        isValid = true;
      }
    }
    if (isValid) {
      e.target.submit();
    }
  });
});

// Register