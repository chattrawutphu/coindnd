from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

app = FastAPI()

# ตั้งค่าเส้นทางสำหรับ static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# ตั้งค่าเส้นทางสำหรับ templates
templates = Jinja2Templates(directory="templates")

@app.get("/2", response_class=HTMLResponse)
async def read_root(request: Request):
    data = {"message": "Hello, World!", "value": 100}
    return templates.TemplateResponse("index.html", {"request": request, "data": data})

@app.get("/3", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("editor.html", {"request": request})

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("dnd editior.html", {"request": request})

@app.get("/test", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("test-modal.html", {"request": request})