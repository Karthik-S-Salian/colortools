const fileListContainer = document.querySelector(".file-list-container");
const dropArea = fileListContainer.querySelector(".drag-area");
const dragText = dropArea.querySelector(".drag-text")
const input = dropArea.querySelector("input");

const canvas = document.createElement('canvas');
const link = document.createElement('a');
const ctx = canvas.getContext('2d');

const validInputExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif", "image/gif", "image/svg"];
const validOutputExtensions = ["jpg", "png", "webp", "avif", "gif"];
const states = { READING: "READING", CONVERTING: "CONVERTING", READY: "READY" ,DOWNLOADED:"DOWNLOADED"}
const imageFilesMap = new Map();
index = 0;

function updateStateOnLoad(image, key) {
  image.onload = () => {
    updateState(states.READY,key);
  }
}

function updateState(state,key){
  fileListContainer.querySelector(`[data-index="${key}"]`).querySelector(".state").textContent = state;
}


function onFilesInput(fileList) {
  dropArea.classList.add("active");
  dragleave();
  if (fileList.length == 0) return;
  for (const file of fileList) {
    if (validInputExtensions.includes(file.type)) {
      ext = file.type.split("/")[1];
      if (ext == "jpeg") ext = "jpg"
      const image = new Image();
      image.src = URL.createObjectURL(file);
      const fileObj = {
        file: file,
        extension: ext,
        image: image,
        state: states.READING,
        convertTo: null
      }
      index++;
      imageFilesMap.set(index, fileObj);
      insertFileUI(fileObj, index)
      updateStateOnLoad(image, index);
    }
  }
  toggleExtraButtons();
}

function downloadFile(key) {
  updateState(states.CONVERTING,key)
  const fileObj = imageFilesMap.get(key)
  canvas.width = fileObj.image.width;
  canvas.height = fileObj.image.height;
  const fileName = fileObj.file.name.split(".")[0] + "." + fileObj.convertTo;

  ctx.drawImage(fileObj.image, 0, 0);
  link.href = canvas.toDataURL('image/' + fileObj.convertTo, 1);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
  updateState(states.DOWNLOADED,key);
}

function bytesSizetoReadable(size) {
  //converts size in bytes to kb mb or gb
  scale = { 0: "bytes", 1: "kb", 2: "mb" }
  prvs_size = 0
  count = -1
  while (Math.floor(size) > 0) {
    prvs_size = size
    size = size / 1024
    count += 1;
  }
  return prvs_size.toFixed(2) + scale[count];
}



function typeSelected(key, element) {
  imageFilesMap.get(key).convertTo = element.options[element.selectedIndex].text
}

function insertFileUI(fileObj, key) {
  file = fileObj.file;
  const possibleOutputType = validOutputExtensions.filter((fileType) => fileType != fileObj.extension)
  imageFilesMap.get(key).convertTo = possibleOutputType[0];
  fileListContainer.innerHTML += `
    <div class="convert-file-container"  data-index="${key}">
        <div class="filename-container">
            <p>${file.name}</p>
            <img src="${fileObj.image.src}" alt="${file.name}"/>
        </div>
        <div>
            <span>${fileObj.extension}</span>
            
            <span>to</span>
            <select name="fileTypes" onchange="typeSelected(${key},this)">
                ${possibleOutputType.reduce((prvs, curr) => prvs + `<option value="${curr}">${curr}</option>`, "")}
            </select>
        </div>
        <span>${bytesSizetoReadable(file.size)}</span>
        <span class="state">${fileObj.state}</span>
        <div>
            
            <span
            onclick="downloadFile(${key})"
            >
            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24"><path fill="green" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"/></svg></span>
            <span
            onclick="removeFile(${key})"
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

function removeFile(key) {
  imageFilesMap.delete(key)
  fileListContainer.querySelector(`[data-index="${key}"]`).remove()
  toggleExtraButtons();
}

function removeAll() {
  for (let key of imageFilesMap.keys()) {
    removeFile(key)
  }
}


dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});


function downloadAll(){
  for (let key of imageFilesMap.keys()) {
    downloadFile(key);
  }
}


/* ************************************ */
const extraButtonsContainer = document.querySelector(".extra-buttons");
function toggleExtraButtons(){
  if(imageFilesMap.size>0){
    extraButtonsContainer.classList.remove("hidden");
  }else{
    extraButtonsContainer.classList.add("hidden");
  }
}