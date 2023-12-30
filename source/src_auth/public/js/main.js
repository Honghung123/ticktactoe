$(() => {
  // Login
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
      $(".error.username").text(
        "Username phải có ít nhất 3 kí tự và không được bắt đầu bằng số và không được phép chứa dấu cách"
      );
      $(".error.username").css("visibility", "visible");
    } else {
      const result = await isUserExist(value);
      if (result.code == 400) {
        $(".error.username").text(result.message);
        $(".error.username").css("visibility", "visible");
      } else {
        $(".error.username").text("");
        $(".error.username").css("visibility", "hidden");
      }
    }
  });
  $("#username").on("focus", async function (e) {
    $(".error.username").css("visibility", "hidden");
  });

  $("#form-login").on("submit", async function (e) {
    e.preventDefault();
    let isValid = false;
    const username = $("#username").val();
    const usernameRgx = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
    if (!username.match(usernameRgx)) {
      $(".error.username").text(
        "Username phải có ít nhất 3 kí tự và không được bắt đầu bằng số và không chứa dấu cách"
      );
      $(".error.username").css("visibility", "visible");
    } else {
      const result = await isUserExist(username);
      if (result.code == 400) {
        $(".error.username").text(result.message);
        $(".error.username").css("visibility", "visible");
      } else {
        $(".error.username").text("");
        $(".error.username").css("visibility", "hidden");
        isValid = true;
      }
    }
    if (isValid) {
      e.target.submit();
    }
  });

  // Register
  $("#usernames").on("blur", async function (e) {
    const value = e.target.value;
    const usernameRgx = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
    if (!value.match(usernameRgx)) {
      $(".error.username").text(
        "Username phải có ít nhất 3 kí tự và không được bắt đầu bằng số và không được phép chứa dấu cách"
      );
      $(".error.username").css("visibility", "visible");
    } else {
      const result = await isUserExist(value);
      if (result.code == 200) {
        $(".error.username").text(result.message);
        $(".error.username").css("visibility", "visible");
      } else {
        $(".error.username").text("");
        $(".error.username").css("visibility", "hidden");
      }
    }
  });
  $("#usernames").on("focus", async function (e) {
    $(".error.username").css("visibility", "hidden");
  });

  $("#fullname").on("blur", async function (e) {
    const value = e.target.value;
    const usernameRgx = /^[a-zA-Z][a-zA-Z\s]{5,}$/;
    if (!value.match(usernameRgx)) {
      $(".error.fullname").text(
        "Phải có ít nhất 6 kí tự và không được chứa số"
      );
      $(".error.fullname").css("visibility", "visible");
    } else {
      $(".error.fullname").text("");
      $(".error.fullname").css("visibility", "hidden");
    }
  });
  $("#fullname").on("focus", async function (e) {
    $(".error.fullname").text("");
    $(".error.fullname").css("visibility", "hidden");
  });

  $("#nickname").on("blur", async function (e) {
    const value = e.target.value;
    const usernameRgx = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
    if (!value.match(usernameRgx)) {
      $(".error.nickname").text(
        "Phải có ít nhất 3 kí tự và không được bắt đầu bằng số và không chứa dấu cách"
      );
      $(".error.nickname").css("visibility", "visible");
    } else {
      $(".error.nickname").text("");
      $(".error.nickname").css("visibility", "hidden");
    }
  });
  $("#nickname").on("focus", async function (e) {
    $(".error.nickname").text("");
    $(".error.nickname").css("visibility", "hidden");
  });

  $("#form-register").on("submit", async function (e) {
    e.preventDefault();
    let isValid = false;
    const username = $("#usernames").val();
    const usernameRgx = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
    if (!username.match(usernameRgx)) {
      $(".error.username").text(
        "Username phải có ít nhất 3 kí tự và không được bắt đầu bằng số và không chứa dấu cách"
      );
      $(".error.username").css("visibility", "visible");
    } else {
      const result = await isUserExist(username);
      if (result.code == 200) {
        $(".error.username").text(result.message);
        $(".error.username").css("visibility", "visible");
      } else {
        $(".error.username").text("");
        $(".error.username").css("visibility", "hidden");
        if (
          $(".error.fullname").text() == "" &&
          $(".error.nickname").text() == ""
        )
          isValid = true;
      }
    }
    if (isValid) {
      e.target.submit();
    }
  });

});

