import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const SignatureBox = forwardRef(({ initialValue }, ref) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.nativeEvent.touches && e.nativeEvent.touches.length > 0) {
      const touch = e.nativeEvent.touches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    } else {
      return {
        offsetX: e.nativeEvent.clientX - rect.left,
        offsetY: e.nativeEvent.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e) => {
    isDrawing.current = true;
    const ctx = canvasRef.current.getContext("2d");
    const { offsetX, offsetY } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const { offsetX, offsetY } = getCanvasCoords(e);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0); // รีเซ็ตก่อนล้าง
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getSignature = () => {
    return canvasRef.current.toDataURL("image/png");
  };

  useImperativeHandle(ref, () => ({
    clear: clearCanvas,
    getSignature: getSignature,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set high-DPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0); // รีเซ็ตก่อน scale
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.clearRect(0, 0, canvas.width, canvas.height); // ✅ ใช้ canvas.width/height

    if (initialValue) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = initialValue;
    }
  }, [initialValue]);

  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-300 w-full rounded"
      style={{ height: 150, touchAction: "none" }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    />
  );
});

export default SignatureBox;
