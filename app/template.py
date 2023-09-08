from fastapi.templating import Jinja2Templates
from fastapi import Request

templates = Jinja2Templates(directory="templates")

def getTemplate(path:str,request:Request,params:dict={}):
    return templates.TemplateResponse(path,{"request":request,**params})