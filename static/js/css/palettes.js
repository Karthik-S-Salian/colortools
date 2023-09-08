// const colorPalettesContainer = document.getElementById("color-palettes-container");
// const loadMoreButton = document.getElementById("load-more-button");

// let offset = 191;

// const limit = 10;
// let isRemaining = true;

// function getContrastRatio(hexColor) {
//     const rgb = hexToRgb(hexColor);
//     const { r, g, b } = rgb;

//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness >= 128 ? 'text-black' : 'text-white';
// }

// function hexToRgb(hexColor) {
//     const hex = hexColor.replace('#', '');
//     const bigint = parseInt(hex, 16);
//     const r = (bigint >> 16) & 255;
//     const g = (bigint >> 8) & 255;
//     const b = bigint & 255;
//     return { r, g, b };
// }

// function addPalette(pallatte){
//     const newDiv = document.createElement("div");
//     newDiv.classList.add("flex", "flex-row", "h-20","font-medium");

//     for (const color of pallatte){
//         newDiv.innerHTML += `
//                         <span 
//                         style="background-color:${color}" 
//                         class="flex-grow group grid place-items-center cursor-pointer ${getContrastRatio(color)}" 
//                         onclick="() => copyToClipboard(color)">
//                             <span class='hidden group-hover:inline'>${color}</span>
//                         </span>
//                         `
//     }
//     colorPalettesContainer.appendChild(newDiv)
// }

// async function fetchMore(){
//     if(!isRemaining)
//         return
//     const response = await fetch(`http://127.0.0.1:8000/css3/api/color-palettes?offset=${offset}&limit=${limit}`)
//     const data = await response.json()
//     console.log(data,data.palettes && data.palettes.length)
//     if(data){
//         if(!data.isRemaining){
//             isRemaining=false
//             loadMoreButton.classList.add("hidden")
//         }
//         if(data.palettes && data.palettes.length){
//             for(const palette of data.palettes)
//                 addPalette(palette)
//             offset += data.palettes.length
//         }
//     }
// }

// fetchMore()