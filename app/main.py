from fastapi import FastAPI,Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
import json

# from fastapi.middleware.cors import CORSMiddleware

# origins = [
#     "http://localhost:3000",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=False,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

templates = Jinja2Templates(directory="templates")

def getTemplate(path:str,request:Request,params:dict={}):
    return templates.TemplateResponse(path,{"request":request,**params})

app = FastAPI(debug=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

_debug = True

if _debug:
    import arel

    hot_reload = arel.HotReload(paths=[arel.Path(".")])
    app.add_websocket_route("/hot-reload", route=hot_reload, name="hot-reload")
    app.add_event_handler("startup", hot_reload.startup)
    app.add_event_handler("shutdown", hot_reload.shutdown)
    templates.env.globals["DEBUG"] = _debug
    templates.env.globals["hot_reload"] = hot_reload



def compute_text_color(color):
    if(len(color)<7):
        return "white"
    r,g,b = int(color[1:3],16),int(color[3:5],16),int(color[5:7],16)
    luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    if luminance > 0.5:
        return "black"
    return "white"

@app.get("/",response_class=HTMLResponse)
async def home_page(request: Request):
    return getTemplate("index.html", request)

@app.get("/color-gradients",response_class=HTMLResponse)
async def color_gradients(request: Request):
    with open("data\color-gradients.json") as fh:
        gradients = json.load(fh)

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
    return getTemplate("gradients.html", request,{"styles":styleList})


@app.get("/color-palettes",response_class=HTMLResponse)
async def color_palettes(request: Request):
    with open("data\color-palettes.json") as fh:
        palettes = json.load(fh)
    return getTemplate("palettes.html", request,{"palettes":palettes,"compute_text_color":compute_text_color})

@app.get("/login",response_class=HTMLResponse)
async def login_page(request: Request):
    return getTemplate("login.html", request)


@app.get("/image-converter",response_class=HTMLResponse)
async def about_us_page(request: Request):
    return getTemplate("image-converter.html", request)

@app.get("/about-us",response_class=HTMLResponse)
async def about_us_page(request: Request):
    return getTemplate("about-us.html", request)