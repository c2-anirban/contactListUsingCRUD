const input = document.getElementById("input");
let search = "";
let contactList = [];

const render = () => {
  const table =
    document.getElementById("contacts") || document.createElement("table");
  table.id = "contacts";
  table.innerHTML = null;

  contactList
    .filter((value) => {
      return (
        value.contactName.includes(search) ||
        value.contactPhone.includes(search) ||
        value.contactEmail.includes(search)
      );
    })
    .forEach((contact, index) => {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      const deleteButton = document.createElement("button");
      const editButton = document.createElement("button");
      const editContactName = document.createElement("input");
      const editContactPhone = document.createElement("input");
      const editContactEmail = document.createElement("input");
      const editNow = document.createElement("button");
      const checkboxInput = document.createElement("input");

      deleteButton.type = "button";
      deleteButton.name = "deleteButton";
      deleteButton.className =
        "btn btn-outline-danger pt-0 pb-0 pl-1 pr-1 mb-2";
      deleteButton.title = "Delete";
      deleteButton.innerHTML = null;
      deleteButton.textContent = "Delete";

      editButton.type = "button";
      editButton.name = "editButton";
      editButton.className =
        "btn btn-outline-secondary pt-0 pb-0 pl-1 pr-1 mb-2";
      editButton.title = "Edit";
      editButton.innerHTML = null;
      editButton.textContent = "Edit";

      editContactName.id = "editContactName" + index;
      editContactName.type = "text";
      editContactName.className = "form-control w-100 mb-2";
      editContactName.innerHTML = null;
      editContactName.value = contact.contactName;
      editContactName.style.display = "none";

      editContactPhone.id = "editContactPhone" + index;
      editContactPhone.type = "text";
      editContactPhone.className = "form-control w-100 mb-2";
      editContactPhone.innerHTML = null;
      editContactPhone.value = contact.contactPhone;
      editContactPhone.style.display = "none";

      editContactEmail.id = "editContactEmail" + index;
      editContactEmail.type = "text";
      editContactEmail.className = "form-control w-100 mb-2";
      editContactEmail.innerHTML = null;
      editContactEmail.value = contact.contactEmail;
      editContactEmail.style.display = "none";

      editNow.type = "button";
      editNow.name = "editNow";
      editNow.className = "btn btn-outline-info w-100 mb-2";
      editNow.innerHTML = null;
      editNow.textContent = "Edit Now";
      editNow.style.display = "none";

      checkboxInput.type = "checkbox";
      checkboxInput.name = "checkboxInput";
      checkboxInput.innerHTML = null;

      table.appendChild(tr);
      tr.appendChild(checkboxInput);
      tr.appendChild(th);
      th.textContent = index + 1 + ".";

      let printArray = [];
      const cN = contact.contactName;
      const cP = " Phone: " + contact.contactPhone;
      const cE = " Email: " + contact.contactEmail;

      printArray.unshift(cN, cP, cE);
      for (let i = 0; i < printArray.length + 1; i++) {
        const td = document.createElement("td");
        td.textContent = printArray[i];
        tr.appendChild(td);
        td.appendChild(editButton);
        td.appendChild(deleteButton);
        td.appendChild(editContactName);
        td.appendChild(editContactPhone);
        td.appendChild(editContactEmail);
        td.appendChild(editNow);
      }
      deleteButton.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
          contactList.splice(index, 1);
          window.localStorage.setItem(
            "contactList",
            JSON.stringify(contactList)
          );
          render();
        }
      });
      editButton.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
          if (
            editContactName.style.display === "none" &&
            editContactPhone.style.display === "none" &&
            editContactEmail.style.display === "none" &&
            editNow.style.display === "none"
          ) {
            editContactName.style.display = "block";
            editContactPhone.style.display = "block";
            editContactEmail.style.display = "block";
            editNow.style.display = "inline";
          } else {
            editContactName.style.display = "none";
            editContactPhone.style.display = "none";
            editContactEmail.style.display = "none";
            editNow.style.display = "none";
          }
          window.localStorage.setItem(
            "contactList",
            JSON.stringify(contactList)
          );
        }
      });
      editNow.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
          const editContactNameInput = document.getElementById(
            "editContactName" + index
          ).value;
          const editContactPhoneInput = document.getElementById(
            "editContactPhone" + index
          ).value;
          const editContactEmailInput = document.getElementById(
            "editContactEmail" + index
          ).value;
          var isExisted = false;
          // const indexOfMyContact =  contactList.indexOf(editContactPhoneInput, 0)

          //   contactList = contactList.splice(index, 1);

          for (i = 0; i < contactList.length; i++) {
            if (index == i) {
              console.log(index);
              isExisted = true;
              break;
            } else {
              if (
                contactList[i]["contactPhone"].toString() ==
                editContactPhoneInput.toString()
              ) {
                isExisted = true;
                alert("Contact no already exist");
                break;
              } else if (
                contactList[i]["contactEmail"].toString() ==
                editContactEmailInput.toString()
              ) {
                alert("Email already exist");
                isExisted = true;
                break;
              }
            }
          }

          if (isExisted == true) {
            //   alert("alraedy exist");
          } else {
            console.log(contactList);
            console.log(index);
            contactList[index].contactName = editContactNameInput;
            contactList[index].contactPhone = editContactPhoneInput;
            contactList[index].contactEmail = editContactEmailInput;
            console.log(contactList);
            window.localStorage.setItem(
              "contactList",
              JSON.stringify(contactList)
            );
          }
          render();
        }
      });
    });
  document.getElementById("container").appendChild(table);
};

document.addEventListener("DOMContentLoaded", () => {
  const storeData = window.localStorage.getItem("contactList");
  contactList = JSON.parse(storeData) || [];
  render();
});

input.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const contactName = document.getElementById("contactName").value;
    const contactPhone = document.getElementById("contactPhone").value;
    const contactEmail = document.getElementById("contactEmail").value;

    let item = localStorage.getItem("contactList");
    item = JSON.parse(item);
    var isExisted = false;
    switch (event.target.name) {
      case "addContact":
        for (var i = 0; i < item.length; i++) {
          if (item[i]["contactPhone"].toString() == contactPhone.toString()) {
            isExisted = true;
            alert("Contact no already exist");
            break;
          } else if (
            item[i]["contactEmail"].toString() == contactEmail.toString()
          ) {
            alert("Email already exist");
            isExisted = true;
            break;
          }
        }
        if (isExisted == true) {
          //   alert("alraedy exist");
        } else {
          contactList.unshift({
            contactName,
            contactPhone,
            contactEmail,
          });
          window.localStorage.setItem(
            "contactList",
            JSON.stringify(contactList)
          );
        }
        // }
        break;
      case "startSearch":
        search = document.getElementById("search").value;
        break;
      default:
        console.log("No such event!");
    }
    render();
  }
});
