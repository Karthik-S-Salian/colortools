from fastapi import APIRouter,Request
from ..utils import get_color_palettes_data,get_color_gradients_data,compute_text_color
from ..template import getTemplate
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/css", tags=["css"])


# @router.get("/color-palettes",response_class=HTMLResponse)
# def color_palettes_page(request: Request):
#     return getTemplate("color-palettes.html",request)

# @router.get("/color-gradients",response_class=HTMLResponse)
# def color_gradients_page(request: Request):
#     return getTemplate("color-gradients.html",request)

@router.get("/color-palettes",response_class=HTMLResponse)
async def color_palettes(request: Request):
    return getTemplate("css/palettes.html", request,{"palettes":get_color_palettes_data(0)[0],"compute_text_color":compute_text_color})


@router.get("/color-gradients",response_class=HTMLResponse)
async def color_gradients(request: Request):
    gradients = get_color_gradients_data(0)[0]
    styleList = []

    for gradient in gradients:
        style = ""
        if (gradient["type"] == "linear"):
            #`linear-gradient(${gradient.direction ? gradient.direction + "," : ""} ${gradient.colorStop.map(e => e.reduce((p, c) => p + " " + c + "% "))})`
            style = f"linear-gradient({gradient['direction'][0]+',' if gradient['direction'] else ''} {','.join([f'{color} {position}%'for color,position in gradient['colorStop']])})"
            # elif (gradient.type == "radial")
            #     style = `radial-gradient( ${gradient.shape ? gradient.shape : gradient.size ? gradient.size : "ellipse"} at ${gradient.position ? gradient.position : "center"} , ${gradient.colorStop.map(e => e.reduce((p, c) => p + " " + c + "% "))})`
            # else
            #     style = `conic-gradient("from " ${gradient.direction ? + gradient.direction : "0deg"} ,${gradient.colorStop.map(e => e.reduce((p, c) => p + " " + c + "% "))})`
        styleList.append(style)    
    return getTemplate("css/gradients.html", request,{"styles":styleList})


@router.get("/api/color-palettes")
def color_pallattes(offset: int = 0, limit: int = 20):
    palettes,isRemaining = get_color_palettes_data(offset, limit)
    return {"palettes": palettes, "isRemaining":isRemaining}


@router.get("/api/color-gradients")
def color_gradients(offset: int = 0, limit: int = 20):
    gradients,isRemaining = get_color_gradients_data(offset, limit)
    return {"gradients": gradients, "isRemaining":isRemaining}