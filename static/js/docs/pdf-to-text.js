const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector(".drag-text")
const input = dropArea.querySelector("#pdf-input");
const browseButton = dropArea.querySelector("#browse-button");
const textContainer = document.getElementById('text-container');
const states = { READING: "READING", CONVERTING: "CONVERTING", READY: "READY", DOWNLOADED: "DOWNLOADED" }

browseButton.addEventListener("click", () => input.click())

input.addEventListener("change", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragleave();
  const file = input.files[0]
  extractPDF(file);

})

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

function extractPDF(file) {

  if (file) {
    const reader = new FileReader();
    reader.onload = async function (event) {
      const typedarray = new Uint8Array(event.target.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;

      let text = '';
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const pageText = await page.getTextContent();
        pageText.items.forEach(item => {
          text += item.str+"\n";
        });
      }
      textContainer.textContent = beautifyText(text);
    };
    reader.readAsArrayBuffer(file);
  }
};

function beautifyText(text){
    let purified = ""
    let count=0;
    let replaceChar = ' '
    for (char of text){
      if(char=='\n'){
        count++;
        replaceChar ='\n' 
      }else if(char==' '){
        count++;
      }else{
        if(count>0){
          purified+=replaceChar;
          count=0;
          replaceChar=' ';
        }
        purified+=char;
      }
    } 
    return purified.trim()
}


dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

function dragleave() {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
}

dropArea.addEventListener("dragleave", dragleave);

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  onFilesInput(event.dataTransfer.files);
});



