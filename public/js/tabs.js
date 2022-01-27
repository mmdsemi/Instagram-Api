const tabitems = [
  ...document.querySelectorAll(".main-tabs .tabs-btns ul li a"),
];
tabitems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const tabscontainer = document.querySelector(".main-tabs");
    const tabnumber = item.dataset.forTab;
    const activetab = tabscontainer.querySelector(
      `.main-tab-content[data-tab= "${tabnumber}"]`
    );
    console.log(tabnumber);
    localStorage.setItem("activeTab", tabnumber);
    tabitems.forEach((itemmen) => {
      itemmen.classList.remove("active");
    });
    tabscontainer.querySelectorAll(".main-tab-content").forEach((tab) => {
      tab.classList.remove("active");
    });
    item.classList.add("active");
    activetab.classList.add("active");
  });
});
(() => {
  let activeTab = localStorage.getItem("activeTab");
  if (activeTab) {
    activeTab = Number.parseInt(activeTab);
    document
      .querySelector(
        `.main-tabs .tabs-btns ul li a[data-for-tab='${activeTab}']`
      )
      ?.click();
  }
})();

const myform = document.getElementById("subset_from");
myform.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name");
  const fname = document.getElementById("fname");
  const gname = document.getElementById("gname");
  const seniorid = document.getElementById("senior_id");
  const username = document.getElementById("username");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const alerts = document.querySelector(".alertss");
  const data = {
    name: name.value,
    familyname: fname.value,
    group_name: gname.value,
    senior_id: seniorid.value,
    username: username.value,
    phonenumber: phone.value,
    password: password.value,
  };
  fetch("http://localhost:8080/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((e) => {
      if (e.errors.length < 1) {
        alerts.innerHTML += `<div class="alert alert-success alert-dismissible show" role="alert">ثبت نام با موفقیت انجام شد<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>`;
      } else {
        for (var i = 0; i < e.errors.length; i++) {
          alerts.innerHTML += `<span class="errs-show">${e.errors[i].msg}</span>`;
        }
      }
    });
  alerts.innerHTML = "";
  myform.reset();
});

const myform_senior = document.getElementById("senior_form");
myform_senior.addEventListener("submit", (e) => {
  e.preventDefault();
  const sname = document.getElementById("sen_name");
  const sfname = document.getElementById("sen_fname");
  const sgname = document.getElementById("sen_gname");
  const stagname = document.getElementById("sen_tagn");
  const susername = document.getElementById("sen_username");
  const spassword = document.getElementById("sen_password");
  const salerts = document.querySelector(".alertss_senior");
  const sdata = {
    name: sname.value,
    familyname: sfname.value,
    group_name: sgname.value,
    tag_name: stagname.value,
    username: susername.value,
    password: spassword.value,
  };
  fetch("http://localhost:8080/register/senior", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sdata),
  })
    .then((response) => {
      return response.json();
    })
    .then((e) => {
      if (e.errors.length < 1) {
        salerts.innerHTML += `<div class="alert alert-success alert-dismissible show" role="alert">ثبت نام با موفقیت انجام شد<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>`;
      } else {
        for (var i = 0; i < e.errors.length; i++) {
          salerts.innerHTML += `<span class="errs-show">${e.errors[i].msg}</span>`;
        }
      }
    });
  salerts.innerHTML = "";
  myform_senior.reset();
});
