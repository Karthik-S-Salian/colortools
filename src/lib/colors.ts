
export function hexToRgb(hexColor: string) {
    const hex = hexColor.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

export function toHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number) {
    
    return "#" + toHex(r) + toHex(g) + toHex(b);
}


export function rgbToGray(r: number, g: number, b: number) {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128;
}


export function flatRGBAArrayToRGBGroupArray(flatArray: number[]|Uint8ClampedArray): number[][] {
    const rgbGroups: number[][] = [];

    for (let i = 0; i < flatArray.length; i += 4) {
        rgbGroups.push([flatArray[i],flatArray[i+1],flatArray[i+2]]);
    }

    return rgbGroups;
}


export function getTextColor(r:number,g:number,b:number){
    return rgbToGray(r,g,b)?"black":"white";
}

export function checkContrast(L1:number,L2:number) {
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
	const passLevel={
		"normalAA":false,
		"bigAAA":false,
		"bigAA":false,
		"uiAA":false,
		"normalAAA":false,
		"overall":false,
		"score":L1
	}

	if (ratio >= 4.5) {
		passLevel.normalAA=true
		passLevel.bigAAA=true
		passLevel.overall=true

	}
	if (ratio >= 3) {
		passLevel.bigAA=true
		passLevel.uiAA=true
	}
	if (ratio >= 7)
		passLevel.normalAAA=true

	return passLevel	
}


function hexToInt(c:string) {
	try {
		return parseInt(c, 16);
	} catch (err) {
		return 0;
	}
	
}

export function HSLtoRGB(H:number, S:number, L:number) {
	var p1, p2;
	L /= 100;
	S /= 100;
	if (L <= 0.5) p2 = L * (1 + S);
	else p2 = L + S - (L * S);
	p1 = 2 * L - p2;
    let R,G,B;
	if (S == 0) {
		R = G = B = L;
	} else {
		R = findRGB(p1, p2, H + 120);
		G = findRGB(p1, p2, H);
		B = findRGB(p1, p2, H - 120);
	}
	return [Math.round(R *= 255), Math.round(G *= 255), Math.round(B *= 255)];
};

function findRGB(q1:number, q2:number, hue:number) {
	if (hue > 360) hue -= 360;
	if (hue < 0) hue += 360;
	if (hue < 60) return (q1 + (q2 - q1) * hue / 60);
	else if (hue < 180) return(q2);
	else if (hue < 240) return(q1 + (q2 - q1) * (240 - hue) / 60);
	else return(q1);
}

function RGBtoHSL(r:number, g:number, b:number) {
	var Min, Max;
	r = (r / 51) * 0.2;
	g = (g / 51) * 0.2;
	b = (b / 51) * 0.2;
	if (r >= g) {
		Max = r;
	} else {
		Max = g;
	}
	if (b > Max) {
		Max = b;
	}
	if (r <= g) {
		Min = r;
	} else {
		Min = g;
	}
	if (b < Min) {
		Min = b;
	}
	const L = (Max + Min) / 2;
    let S=0,H=0;
	if (Max == Min) {
		S = H = 0;
	} else {
		if (L < 0.5) {
			S = (Max - Min) / (Max + Min);
		} else {
			S = (Max - Min) / (2 - Max - Min);
		}
		if (r == Max) {
			H = (g - b) / (Max - Min);
		}
		if (g == Max) {
			H = 2 + ((b - r) / (Max - Min));
		}
		if (b == Max) {
			H = 4 + ((r - g) / (Max - Min));
		}
	}
	H = Math.round(H * 60);
	if (H < 0) {
		H += 360;
	}
	if (H >= 360) {
		H -= 360;
	}
	return [H, Math.round(S * 100), Math.round(L * 100)];
}



function getsRGB(c:number) {
	c = c / 255;
	c = (c <= 0.03928) ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);
	return c;
}

export function hexToRGB(hex:string){
	return [hex.substring(1, 3),hex.substring(3, 5),hex.substring(5, 7)]
}

export function getLFromRGB(r:number,g:number,b:number) {
	return (0.2126 * r + 0.7152 *g + 0.0722 * b);
}