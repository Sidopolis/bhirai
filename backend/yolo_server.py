from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from PIL import Image
import io
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv5 model (using ultralytics/yolov5)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

class Detection(BaseModel):
    class_name: str
    confidence: float
    bbox: List[float]  # [x1, y1, x2, y2]

class DetectionResponse(BaseModel):
    detections: List[Detection]

@app.post("/detect", response_model=DetectionResponse)
async def detect(file: UploadFile = File(...)):
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    results = model(img)
    detections = []
    for *xyxy, conf, cls in results.xyxy[0].tolist():
        class_name = results.names[int(cls)]
        detections.append(Detection(
            class_name=class_name,
            confidence=conf,
            bbox=xyxy
        ))
    return DetectionResponse(detections=detections) 