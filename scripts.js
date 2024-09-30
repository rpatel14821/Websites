document.getElementById("addItemForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    let itemName = document.getElementById("itemName").value;
    let itemQuantity = parseInt(document.getElementById("itemQuantity").value, 10);
    let itemCategory = document.getElementById("itemCategory").value;

    addItemToInventory(itemName, itemQuantity, itemCategory);
    
    // Clear input fields after adding the item
    document.getElementById("addItemForm").reset();
});

function addItemToInventory(name, quantity, category) {
    let table = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let itemNameCell = newRow.insertCell(0);
    let itemQuantityCell = newRow.insertCell(1);
    let itemCategoryCell = newRow.insertCell(2);
    let actionsCell = newRow.insertCell(3);

    itemNameCell.textContent = name;
    itemQuantityCell.textContent = quantity;
    itemCategoryCell.textContent = category;

    // Create remove quantity input field and button
    let removeQuantityInput = document.createElement("input");
    removeQuantityInput.type = "number";
    removeQuantityInput.min = "1";
    removeQuantityInput.value = "1";
    removeQuantityInput.className = "remove-quantity-input";

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Quantity";
    removeButton.className = "remove-button";
    removeButton.addEventListener("click", function () {
        removeQuantity(newRow, removeQuantityInput.value);
    });

    actionsCell.appendChild(removeQuantityInput);
    actionsCell.appendChild(removeButton);
}

function removeQuantity(row, quantityToRemove) {
    let quantityCell = row.cells[1];
    let currentQuantity = parseInt(quantityCell.textContent, 10);
    let removeAmount = parseInt(quantityToRemove, 10);

    if (removeAmount > currentQuantity) {
        alert("You can't remove more than the current quantity!");
        return;
    }

    currentQuantity -= removeAmount;
    quantityCell.textContent = currentQuantity;

    if (currentQuantity === 0) {
        row.remove(); // Remove the row if quantity becomes 0
    }
}
