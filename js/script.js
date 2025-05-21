let result = {
    "tag": "",
    "free": true,
    "role": false,
    "user": "ananddixit1430",
    "email": "ananddixit1430@gmail.com",
    "score": 0.64,
    "state": "deliverable",
    "domain": "gmail.com",
    "reason": "valid_mailbox",
    "mx_found": true,
    "catch_all": null,
    "disposable": false,
    "smtp_check": true,
    "did_you_mean": "",
    "format_valid": true
}

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    resultCont.innerHTML = `<img  width="123" src="images/loading.svg" alt="Loading">`
    key = "ema_live_EFGjF2grNUtzagH2z6nfsH8q1Bafh3IW7CUtQ1SU"
    let email = document.getElementById("email").value
    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`
    try {
        let res = await fetch(url)
        let result = await res.json()
        // Check if the email is valid based on the "state" or "reason"
        let message = "";
        let usageMessage = "";

        // Check if the email is valid, active, and deliverable
        if (result.state === "deliverable" && result.reason === "valid_mailbox" && result.smtp_check === true) {
            message = `<p style="color: green; font-weight: bold;">✅ The email <strong>${result.email}</strong> is valid, active, and deliverable.</p>`;
            usageMessage = `<p style="color: blue; font-weight: bold;">➡️ This email is in use.</p>`;
        } else {
            message = `<p style="color: red; font-weight: bold;">❌ The email <strong>${result.email}</strong> is not valid, active, or deliverable.</p>`;
            usageMessage = `<p style="color: orange; font-weight: bold;">⚠️ This email is not in use.</p>`;
        }

        let str = `<h3 style="background: var(--bg-color); color: var(--text-color);">Your result will be displayed here</h3>${message}${usageMessage}
                    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; background: var(--bg-color); color: var(--text-color);">
                        <thead>
                                <tr>
                                  <th>Field</th>
                                  <th>Value</th>
                                </tr>
                        </thead>
                    <tbody>`;
        for (key of Object.keys(result)) {
            if (result[key] !== "" && result[key] !== " ") {
                str += `<tr><td>${key}</td><td>${result[key]}</td></tr>`;
            }
        }

        str += `</tbody></table>`;

        console.log(str)
        // resultCont.innerHTML = str
        document.getElementById('resultCont').innerHTML = str;
    } catch (error) {
        document.getElementById('resultCont').innerHTML = `<p style="color: red;">Error fetching email validation: ${error}</p>`;
    }
})