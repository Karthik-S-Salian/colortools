function copyGradient(style) {
    navigator.clipboard.writeText(style)
        .then(() => {
            
        })
        .catch((error) => {
            console.error('Error copying text to clipboard:', error);
        });
}

/*    const colorGradientsContainer = document.getElementById("color-gradients-container");
    const loadMoreButton = document.getElementById("load-more-button");

    let offset = 0;

    const limit = 10;

    function getContrastRatio(hexColor) {
        const rgb = hexToRgb(hexColor);
        const { r, g, b } = rgb;
    
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness >= 128 ? 'text-black' : 'text-white';
    }
    
    function hexToRgb(hexColor) {
        const hex = hexColor.replace('#', '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }

    function addGradient(gradient){
        let style = ""
                    if (gradient.type == "linear")
                        style = `linear-gradient(${gradient.direction ? gradient.direction + "," : ""} ${gradient.colorStop.map(e => e.reduce((p, c) => p + " " + c + "% "))})`
                    else if (gradient.type == "radial")
                        style = `radial-gradient( ${gradient.shape ? gradient.shape : gradient.size ? gradient.size : "ellipse"} at ${gradient.position ? gradient.position : "center"} , ${gradient.colorStop.map(e => e.reduce((p, c) => p + " " + c + "% "))})`
                    else
                        style = `conic-gradient("from " ${gradient.direction ? + gradient.direction : "0deg"} ,${gradient.colorStop.map(e => e.reduce((p, c) => p + " " + c + "% "))})`

                     colorGradientsContainer.innerHTML+=`
                    <div style="background:${style}" class="aspect-video w-full rounded-md hover:scale-105 transition-all flex flex-col items-center justify-center gap-4 text-white group">
                        <button class=' bg-black w-12 text-center py-1 rounded-sm hidden group-hover:inline text-sm'>Copy</button>
                        <button class=' bg-black w-12 text-center py-1 rounded-sm hidden group-hover:inline text-sm'>Edit</button>
                    </div>                    
                    `
    }

    async function fetchMore(){
        const response = await fetch(`http://127.0.0.1:8000/css3/api/color-gradients?offset=${offset}&limit=${limit}`)
        const data = await response.json()
        if(data){
            if(!data.isRemaining){
                loadMoreButton.classList.add("hidden")
            }
            if(data.gradients && data.gradients.length){
                for(const gradient of data.gradients)
                    addGradient(gradient)
                offset += data.gradients.length
            }
        }
    }

    fetchMore() */