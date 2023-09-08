from fastapi import APIRouter,Request
from ..template import getTemplate
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/text", tags=["text"])