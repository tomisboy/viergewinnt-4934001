let lastActive;

function initSessionHandler() {
    lastActive = Date.now();
    window.setInterval(sessionValid, 900);
}

function sessionValid() {
    $.ajax({
        url: "util.php",
        type: "post",
        data: { verifySession: true },

        success: function (response) {
            response = response.split(",");
            response.forEach(function (currentValue) {
                currentValue = currentValue.split(", ");
                switch (currentValue[0]) {
                    case "afk":
                        if (currentValue[1] === "true") {
                            alert("Inaktivität", "Du wurdest auf Grund von Inaktivität ausgeloggt!", 3);

                            $.ajax({
                                url: "index.php",
                                type: "post",
                                data: { logout: true }
                            });
                        } else {
                            if (currentValue[1] > 14 * 60) {
                                $("#auto").text("Auto-Logout in: " + (5 * 60 - currentValue[1] + 1));
                            } else {
                                $("#auto").text("");
                            }
                        }
                        break;
                    case "ip":
                        if (currentValue[1] === "true") {
                            alert("IP-Veränderung", "Du sicherheitshalber ausgeloggt!", 3);

                            $.ajax({
                                url: "index.php",
                                type: "post",
                                data: { logout: true }
                            });
                        }
                        break;
                    default:
                        break;
                }
            });
        }
    });
}