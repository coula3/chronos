const employeePositions = [
  "Cashier",
  "Cook",
  "Customer Associate",
  "Forklift Operator",
  "Fresh Food Associate",
  "Loader",
  "Manager",
  "Material Handler",
  "Receiving Associate",
  "Sales Associate",
  "Shipping Associate",
  "Stocker",
  "Warehouse Associate",
];

function appendEmployeeFormElements() {
  const defaultValue = "--choose your position--";
  const positionList = [...employeePositions];
  positionList.unshift(defaultValue);

  const positionOptions = positionList.map((position) => {
    const optionValue = position !== "--choose your position--" ? position : "";
    return `<option value="${optionValue}">${position}</option>`;
  });

  const formElements = `
        <div id="div-input-elements">
            <input id="first-name" class="input" type="text" name="first-name" placeholder="first name" />
            <input id="last-name" class="input" type="text" name="last-name" placeholder="last name" />
            <select type="select" id="position" name="position">
               ${positionOptions}
            </select>
            <input id="email" class="input" type="text" name="email" placeholder="email" />
            <input id="password" class="input" type="password" name="password" placeholder="password" />
            <input id="password-confirmation" class="input" type="password" name="password-confirmation" placeholder="password confirmation" />
        </div>
    `;
  buttonCreateUser.insertAdjacentHTML("beforebegin", formElements);
  document.getElementById("first-name").focus();
}
