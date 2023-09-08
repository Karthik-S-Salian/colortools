from fastapi import APIRouter,Request
from ..template import getTemplate
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/image", tags=["css"])

@router.get("/image-converter",response_class=HTMLResponse)
async def image_converter(request: Request):
    return getTemplate("image/image-converter.html", request)

@router.get("/image-color-picker",response_class=HTMLResponse)
async def image_color_pickere(request: Request):
    return getTemplate("image/image-color-picker.html", request)