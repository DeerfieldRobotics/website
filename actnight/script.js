

const emails = ['aGNpdHJvbkBkZWVyZmllbGRyb2JvdGljcy5vcmc=', 'ZWphY29ic0BkZWVyZmllbGRyb2JvdGljcy5vcmc=', 'bWV2YXJ0c0BkZWVyZmllbGRyb2JvdGljcy5vcmc=']

const emailsId = ['citronemail', 'ethanemail', 'mikeyemail'];

setTimeout(() => {
    emailsId.forEach((element, index) => {
        document.getElementById(element).innerText = atob(emails[index]);
        document.getElementById(element).href = `mailto:${atob(emails[index])}`;
    });
}, 1500);

(async () => {
    const DATA_SITE = "https://link.deerfieldrobotics.org";

    let sesNum = 0;
    if (localStorage.getItem("sess")) {
        sesNum = parseInt(localStorage.getItem("sess")) + 1;
    }
    localStorage.setItem("sess", sesNum);

    const sendData = async (evt) => {
        let body = {};

        if (localStorage.getItem("id")) {
            body.id = localStorage.getItem("id");
        }
        body.sess = sesNum;
        body.evt = evt;

        let res = await (await fetch(DATA_SITE + "/add", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })).json();

        if (res.id) {
            localStorage.setItem("id", res.id);
        }
    };
    document.getElementById("citronemail").onclick = () => sendData("Citron Emailed");
    document.getElementById("ethanemail").onclick = () => sendData("Ethan Emailed");
    document.getElementById("mikeyemail").onclick = () => sendData("Mikey Emailed");
    document.getElementById("formfill").onclick = (e) => {
        e.preventDefault();
        sendData("Form Clicked").then(() => {
            window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSc9ZSsDdPR1H9DupQIruJRLAu3duYV9dnTX3iKzcQM1JsPTdg/viewform";
        });
    };

    await sendData("New page load");

    document.getElementById("formfill").href = DATA_SITE + "/go/" + encodeURIComponent(btoa("act23+" + localStorage.getItem("id") + "+" + sesNum));
})();
