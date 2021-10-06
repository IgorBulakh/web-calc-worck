const prices = {
  "landing-page": {
    pm: 700,
    design: 600,
    developer: 1200,
    qa: 500,
  },
  "online-store": {
    pm: 1200,
    design: 900,
    developer: 2500,
    qa: 800,
  },
  "web-application": {
    pm: 2000,
    design: 1100,
    developer: 3000,
    qa: 1000,
  },
  "mobile-application": {
    pm: 3000,
    design: 1500,
    developer: 4000,
    qa: 1300,
  },
};

// const webSiteElement = document.querySelector("#project-type");
// console.log(webSiteElement.value);

function getFormValues() {
  const webSiteElement = document.querySelector("#project-type");

  const pmRef = document.querySelector("#project-managment");
  const designRef = document.querySelector("#design");
  const devRef = document.querySelector("#development");
  const qaRef = document.querySelector("#project-qa");

  // console.log(webSiteElement.value);

  // console.log(pmRef.checked);
  // console.log(designRef.checked);
  // console.log(devRef.checked);
  // console.log(qaRef.checked);

  return {
    webSiteElem: webSiteElement.value,
    pm: pmRef.checked,
    design: designRef.checked,
    developer: devRef.checked,
    qa: qaRef.checked,
  };
}

function calcRef() {
  const values = getFormValues();

  let totalSum = 0;

  const cashWork = prices[values.webSiteElem];

  if (values.pm) {
    totalSum = cashWork.pm;
  }
  if (values.design) {
    totalSum = totalSum + cashWork.design;
  }
  if (values.developer) {
    totalSum = totalSum + cashWork.developer;
  }
  if (values.qa) {
    totalSum = totalSum + cashWork.qa;
  }

  const totalSumEl = document.querySelector("#total-sum-js");
  totalSumEl.textContent = totalSum;

  console.log(totalSum);
}

calcRef();
getFormValues();

const formPrice = document.querySelector("#form-price-js");
const modalMail = document.querySelector("#modal-mail-js");
const modalSuccess = document.querySelector("#success-modal-js");
formPrice.addEventListener("change", calcRef);

formPrice.addEventListener("submit", function (event) {
  event.preventDefault();
  modalMail.classList.add("modal-active");
});

const closeMdal = document.querySelectorAll(".close-form-icon");
closeMdal.forEach(function (closeBtn) {
  closeBtn.addEventListener("click", function () {
    const inputError = document.querySelector("#email-container-check");
    inputError.classList.remove("email-container-check-error");

    modalMail.classList.remove("modal-active");
    modalSuccess.classList.remove("modal-active");
  });
});

const mailControl = document.querySelector("#form-mail-coontainer");
mailControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const userMail = document.querySelector("#user-email");

  if (userMail.value) {
    const formData = new FormData(formPrice);

    formData.append("Email", userMail.value);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(function () {
        modalMail.classList.remove("modal-active");
        modalSuccess.classList.add("modal-active");
      })
      .catch(() => alert("form not sent"));

    return;
  }
  const inputError = document.querySelector("#email-container-check");
  inputError.classList.add("email-container-check-error");
});
