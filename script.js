const tagTree = document.getElementById("tagTree");
const exportButton = document.getElementById("exportButton");

const initialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: 'c1-c1 Hello' },
        { name: 'child1-child2', data: 'c1-c2 JS' },
        { name: 'child2-child1', data: 'c2-nc Universe'},
      ],
    },
    { name: 'child2', data: 'c2 World' },
  ],
};

function renderTag(tag) {
    const tagDiv = document.createElement("div");
    tagDiv.classList.add("tag");
  
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("tag-header");
  
    const leftArrow = document.createElement("button");
    leftArrow.classList.add("toggle-button");
    leftArrow.textContent = "v"; // Left arrow unicode character
    leftArrow.addEventListener("click", () => toggleCollapse(tagDiv, tag));
  
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("tag-name");
    nameSpan.textContent = tag.name;
    nameSpan.addEventListener("click", () => shoeData(tag));
  
    const addChildButton = document.createElement("button");
    addChildButton.classList.add("add-child-button");
    addChildButton.textContent = "Add Child";
    addChildButton.addEventListener("click", () => addChild(tag));
  
    headerDiv.appendChild(leftArrow);
    headerDiv.appendChild(nameSpan);
    headerDiv.appendChild(addChildButton);
  
    tagDiv.appendChild(headerDiv);
  
    if (tag.data !== undefined) {
        const dataInput = document.createElement("input");
        dataInput.classList.add("tag-data-input");
        dataInput.type = "text";
        dataInput.value = tag.data;
        dataInput.addEventListener("input", (e) => updateData(tag, e.target.value));
        tagDiv.appendChild(dataInput);
      }
    if (tag.children) {
      const childrenDiv = document.createElement("div");
      for (const child of tag.children) {
        const childTag = renderTag(child);
        childrenDiv.appendChild(childTag);
      }
      tagDiv.appendChild(childrenDiv);
    }
  
    return tagDiv;
  }


function toggleCollapse(tagDiv, tag) {
  const childrenDiv = tagDiv.querySelector(".tag > div");
  if (childrenDiv) {
    childrenDiv.style.display = tag.isCollapsed ? "block" : "none";
    tag.isCollapsed = !tag.isCollapsed;
  }
}

function updateData(tag, newData) {
  tag.data = newData;
}

function editTagName(nameSpan, tag) {
  const newNameInput = document.createElement("input");
  newNameInput.type = "text";
  newNameInput.value = tag.name;

  nameSpan.replaceWith(newNameInput);
  newNameInput.focus();

  newNameInput.addEventListener("blur", () => {
    tag.name = newNameInput.value;
    newNameInput.replaceWith(nameSpan);
    nameSpan.textContent = tag.name;
  });

  newNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      newNameInput.blur();
    }
  });
}

function addChild(parent) {
  const newChild = { name: "New Child", data: "Data" };
  if (!parent.children) {
    parent.children = [];
  }
  parent.children.push(newChild);
  tagTree.innerHTML = "";
  tagTree.appendChild(renderTag(initialTree));
}


function exportTree() {
    const exportedTree = JSON.stringify(initialTree, );
    console.log(exportedTree);
  }

tagTree.appendChild(renderTag(initialTree));
exportButton.addEventListener("click", exportTree);