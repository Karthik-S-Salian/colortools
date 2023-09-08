import json
from typing import Union

def get_color_palettes_data(offset: int, limit: Union[int,None]=None)->tuple[list,bool]:
    with open("data\color-palettes.json") as fh:
        data:list = json.load(fh)

    if data:
        if limit is None:
            return data[offset:],0
        return data[offset:offset+limit],(len(data)-offset+limit)>0
    return [],False

    
def get_color_gradients_data(offset: int, limit: Union[int,None]=None)->tuple[list,bool]:
    with open("data\color-gradients.json") as fh:
        data = json.load(fh)

    if data:
        if limit is None:
            return data[offset:],0
        return data[offset:offset+limit],(len(data)-offset+limit)>0
    return [],False


def compute_text_color(color):
    if(len(color)<7):
        return "white"
    r,g,b = int(color[1:3],16),int(color[3:5],16),int(color[5:7],16)
    luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    if luminance > 0.5:
        return "black"
    return "white"