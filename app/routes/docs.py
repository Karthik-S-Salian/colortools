from fastapi import APIRouter,Request
from ..template import getTemplate
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/docs", tags=["docs"])

@router.get("/pdf-to-text",response_class=HTMLResponse)
async def about_us_page(request: Request):
    return getTemplate("docs/pdf-to-text.html", request)