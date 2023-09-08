from fastapi import FastAPI,Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi import Request
from .routes import text, css,image,docs
from .template import templates,getTemplate

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


@app.get("/",response_class=HTMLResponse)
async def home_page(request: Request):
    return getTemplate("index.html", request)

@app.get("/about-us",response_class=HTMLResponse)
async def about_us_page(request: Request):
    return getTemplate("about-us.html", request)


app.include_router(text.router)
app.include_router(css.router)
app.include_router(docs.router)
app.include_router(image.router)
