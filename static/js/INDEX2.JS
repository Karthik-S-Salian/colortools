//selecting all required elements
/*
const fileListContainer = document.querySelector(".file-list-container");
const dropArea = fileListContainer.querySelector(".drag-area");
const browseButton = dropArea.querySelector("button");
const dragText = dropArea.querySelector(".drag-text")
const input = dropArea.querySelector("input");
const imageFiles = [];
const validInputExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif", "image/gif", "image/svg"];
const validOutputExtensions = ["jpg", "png", "webp", "avif", "gif"];
const states = { UPLOADING: "UPLOADING", CONVERTING: "CONVERTING", READY: "READY" }

browseButton.onclick = () => {
    input.click();
}

function onFilesInput(fileList) {
    for (i=0;i<fileList.length;i++) {
        const file = fileList[i]
        if (validInputExtensions.includes(file.type)) {
            ext = file.name.split("/")[1];
            if (ext == "jpeg") ext = "jpg"
            const image = new Image();
            image.src = URL.createObjectURL(file);
            const fileObj = {
                file: file,
                extension: ext,
                state: states.UPLOADING,
                convertTo: null
            }
            imageFiles.push(fileObj);
            insertFileUI(fileObj)
            image.onload = event =>{
                fileListContainer.querySelectorAll()[i].textContent = states.READY
            }
        }
    }
    console.log(files)
    dragleave();
    updateUI();
}

input.addEventListener("change", function () {
    dropArea.classList.add("active");
    onFilesInput(input.files)
});

function typeSelected(index, element) {
    console.log(index, element.options[element.selectedIndex].text)
}

function insertFileUI(fileObj, index) {
    file =  fileObj.file;
    const possibleOutputType = validOutputExtensions.filter((fileType) => fileType != fileObj.extension)
    fileListContainer.innerHTML += `
    <div class="convert-file-container">
        <div class="filename-container">
            <p>${file.name}</p>
            <img src="" alt="${file.name}"/>
        </div>
        <div>
            <span>${fileObj.extension}</span>
            
            <span>to</span>
            <select name="fileTypes" onchange="typeSelected(${index},this)">
                ${possibleOutputType.reduce((prvs, curr) => prvs + `<option value="${curr}">${curr}</option>`, "")}
            </select>
        </div>
        <span>${file.size}</span>
        <span class="state">READY</span>
        <div>
            
            <span
            onclick="downloadFile"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"/></svg></span>
            <span
            onclick="removeFile(${index})"
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg></span>
        </div>
    </div>`
}


function updateUI() {
    if (imageFiles.length == 0) return;
    dropArea.classList.add("hidden");
    imageFiles.forEach((fileObj, index) => {
        fileListContainer.innerHTML += createFileUI(fileObj, index);
    })

}

function dragleave() {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
}

dropArea.addEventListener("dragleave", dragleave);

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    onFilesInput(event.dataTransfer.files);
});

*/

/*
//selecting all required elements
const fileListContainer = document.querySelector(".file-list-container");
const dropArea = fileListContainer.querySelector(".drag-area");
const browseButton = dropArea.querySelector("button");
const dragText = dropArea.querySelector(".drag-text")
const input = dropArea.querySelector("input");
const files = [];
const validInputExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif", "image/gif", "image/svg"];
const validOutputExtensions = ["jpg", "png", "webp", "avif", "gif"];

const states = ["UPLOADING","CONVERTING","READY"]

browseButton.onclick = () => {
  input.click();
}

function onFilesInput(fileList) {
  for (const file of fileList) {
    if (validInputExtensions.includes(file.type)) {
      files.push(file);
    }
  }
  console.log(files)
  dragleave();
  updateUI();
}

input.addEventListener("change", function () {
  dropArea.classList.add("active");
  onFilesInput(input.files)
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});


function removeFile(index) {
  files.splice(index, 1);
  updateUI();
}

function typeSelected(index, element) {
  console.log(index, element.options[element.selectedIndex].text)
}

function createFileUI(file, index) {
  inputFileType = file.type.split("/")[1];
  if (inputFileType == "jpeg") inputFileType == "jpg"
  const possibleOutputType = validOutputExtensions.filter((fileType) => fileType != inputFileType)
  return (`<div class="convert-file-container">
  <div class="filename-container">
    <p>${file.name}</p>
    <img src="" alt="${file.name}"/>
  </div>
  <div>
  <span>${file.type}</span>
  
  <span>to</span>
  <select name="fileTypes" onchange="typeSelected(${index},this)">
      ${possibleOutputType.reduce((prvs, curr) => prvs + `<option value="${curr}">${curr}</option>`, "")}
  </select>
  </div>

  <span>${file.size}</span>

  <span>READY</span>

<div>
  
  <span
    onclick="downloadFile"
  >
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"/></svg></span>
  <span
    onclick="removeFile(${index})"
  ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg></span>
</div>
</div>`)
}

function updateUI() {
  if (files.length == 0) return;
  dropArea.classList.add("hidden");
  files.forEach((file, index) => {
    fileListContainer.innerHTML += createFileUI(file, index);
  })

}

function dragleave() {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
}

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", dragleave);

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  onFilesInput(event.dataTransfer.files);
});

/*
function myFunction() {

  var file = document.getElementById('file').files[0];
  var reader  = new FileReader();
  reader.onload = function(e)  {
      var image = document.createElement("img");
      image.src = e.target.result;
      document.body.appendChild(image);
   }
   reader.readAsDataURL(file);
}
*/

/*
//selecting all required elements
const fileListContainer = document.querySelector(".file-list-container");
const dropArea = fileListContainer.querySelector(".drag-area");
const browseButton = dropArea.querySelector("button");
const dragText = dropArea.querySelector(".drag-text")
const input = dropArea.querySelector("input");
const canvas = document.createElement('canvas');
const link = document.createElement('a');
const ctx = canvas.getContext('2d');
const imageFiles = [];
const validInputExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif", "image/gif", "image/svg"];
const validOutputExtensions = ["jpg", "png", "webp", "avif", "gif"];
const states = { UPLOADING: "UPLOADING", CONVERTING: "CONVERTING", READY: "READY" }

// browseButton.onclick = () => {
//   console.log("clicked")
  
// }

function updateState(image, index) {
  image.onload = () => {
    fileListContainer.querySelectorAll(".state")[index].textContent = states.READY
  }
}

function onFilesInput(fileList) {
  dragleave();
  if (fileList.length == 0) return;
  for (i = 0; i < fileList.length; i++) {
    const file = fileList[i]
    if (validInputExtensions.includes(file.type)) {
      ext = file.type.split("/")[1];
      if (ext == "jpeg") ext = "jpg"
      const image = new Image();
      image.src = URL.createObjectURL(file);
      const fileObj = {
        file: file,
        extension: ext,
        image: image,
        state: states.UPLOADING,
        convertTo: null
      }
      imageFiles.push(fileObj);
      insertFileUI(fileObj,i)
      updateState(image, i);
    }
  }
  console.log("out")
  
}


function downloadFile(index) {
  const fileObj = imageFiles[index]
  canvas.width = fileObj.image.width;
  canvas.height = fileObj.image.height;
  const fileName = fileObj.file.name.split(".")[0]+"."+fileObj.convertTo; 

  ctx.drawImage(fileObj.image, 0, 0);
  link.href = canvas.toDataURL('image/'+fileObj.convertTo, 1);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  // canvas.toBlob(function (blob) {
  //   link.href = URL.createObjectURL(blob);
  //   link.download = fileName;
  //   link.click();
  //   URL.revokeObjectURL(link.href);
  // }, 'image/'+fileObj.convertTo);
}

function bytesSizetoReadable(size){
  //converts size in bytes to kb mb or gb
  scale={0:"bytes",1:"kb",2:"mb"}
  prvs_size = 0
  count = -1
  while(Math.floor(size)>0){
    prvs_size = size
    size = size/1024
    count+=1;
  }
  return prvs_size.toFixed(2)+scale[count];

}

input.addEventListener("change", function () {
  dropArea.classList.add("active");
  onFilesInput(input.files)
});

function typeSelected(index, element) {
  imageFiles[index].convertTo = element.options[element.selectedIndex].text
}

function insertFileUI(fileObj, index) {
  file = fileObj.file;
  const possibleOutputType = validOutputExtensions.filter((fileType) => fileType != fileObj.extension)
  console.log(index)
  imageFiles[index].convertTo=possibleOutputType[0];
  fileListContainer.innerHTML += `
    <div class="convert-file-container"  data-index="${index}">
        <div class="filename-container">
            <p>${file.name}</p>
            <img src="${fileObj.image.src}" alt="${file.name}"/>
        </div>
        <div>
            <span>${fileObj.extension}</span>
            
            <span>to</span>
            <select name="fileTypes" onchange="typeSelected(${index},this)">
                ${possibleOutputType.reduce((prvs, curr) => prvs + `<option value="${curr}">${curr}</option>`, "")}
            </select>
        </div>
        <span>${bytesSizetoReadable(file.size)}</span>
        <span class="state">${fileObj.state}</span>
        <div>
            
            <span
            onclick="downloadFile(${index})"
            >
            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24"><path fill="green" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"/></svg></span>
            <span
            onclick="removeFile(${index})"
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24"><path fill="red" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg></span>
        </div>
    </div>`
}

function dragleave() {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
}

dropArea.addEventListener("dragleave", dragleave);

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  onFilesInput(event.dataTransfer.files);
});

function removeFile(index){
  imageFiles.splice(index,1)
  fileListContainer.querySelectorAll(`[data-index="${index}"]`).remove()
}

function removeAll(){
  for(i=0;i<imageFiles.length;i++){

  }
}


dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

*/
