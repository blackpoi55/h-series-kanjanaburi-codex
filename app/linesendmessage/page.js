"use client";
import { sendLineMessage } from "@/action/api";
import { useState } from "react";
import Swal from "sweetalert2";

export default function LineOAMessageSender() {
    const [sendType, setSendType] = useState("all");
    const [userId, setUserId] = useState("");
    const [messageType, setMessageType] = useState("text");
    const [messageContent, setMessageContent] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [stickerPackageId, setStickerPackageId] = useState("");
    const [stickerId, setStickerId] = useState("");

    // 🔥 Flex Message UI Builder
    const [flexMessages, setFlexMessages] = useState([
        { contents: [{ type: "text", text: "📢 ประกาศใหม่", size: "xl", weight: "bold", align: "center", color: "#1DB446" }] },
    ]);
    const stickerList = [
        { packageId: "1", stickerId: "1", description: "Moon หลับ" },
        { packageId: "1", stickerId: "2", description: "Moon ยิ้ม" },
        { packageId: "1", stickerId: "3", description: "Moon ตกใจ" },
        { packageId: "1", stickerId: "4", description: "Moon ขอร้อง" },
        { packageId: "1", stickerId: "5", description: "Moon รัก" },
        { packageId: "1", stickerId: "6", description: "Moon โกรธ" },
        { packageId: "1", stickerId: "7", description: "Moon ชี้นิ้วทำหน้าดุ" },
        { packageId: "1", stickerId: "8", description: "Moon แปลกใจ" },
        { packageId: "1", stickerId: "9", description: "Moon นั่งกอดเข่าร้องไห้" },
        { packageId: "1", stickerId: "10", description: "Moon ทำหน้าเจ้าเลห์เอามือป้องปาก" },
        { packageId: "1", stickerId: "13", description: "Moon ชูนิ้วโป้ง เยี่ยม" },
        { packageId: "1", stickerId: "14", description: "Moon ชูสองนิ้วโป้งน้ำตาไหล" },
    ];

    const [selectedSticker, setSelectedSticker] = useState({ packageId: "", stickerId: "" });

    const handleStickerChange = (e) => {
        const selected = stickerList.find(sticker => `${sticker.packageId}-${sticker.stickerId}` === e.target.value);
        if (selected) {
            setSelectedSticker({ packageId: selected.packageId, stickerId: selected.stickerId });
        }
    };

    // ✅ รีเซ็ตค่าที่ไม่เกี่ยวข้องเมื่อเปลี่ยนประเภทข้อความ
    const handleMessageTypeChange = (e) => {
        const newType = e.target.value;
        setMessageType(newType);

        if (newType !== "text") setMessageContent("");
        if (!["image", "video"].includes(newType)) setMediaUrl("");
        if (newType !== "sticker") {
            setStickerPackageId("");
            setStickerId("");
        }
        if (newType !== "flex") {
            setFlexMessages([{ contents: [{ type: "text", text: "📢 หัวข้อใหม่" }] }]);
        }
    };

    // ✅ สร้าง JSON Flex Message
    const generateFlexMessage = () => {
        return JSON.stringify({
            type: "carousel",
            contents: flexMessages.map((bubble) => ({
                type: "bubble",
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: bubble.contents.map((content) => {
                        if (content.type === "image") {
                            return { type: "image", url: content.url, size: "full" }; // ✅ ไม่มี text
                        }
                        return content;
                    }),
                },
            })),
        });
    };



    // ✅ เพิ่ม Bubble ใหม่
    const addFlexBubble = () => {
        setFlexMessages([...flexMessages, { contents: [{ type: "text", text: "📢 หัวข้อใหม่" }] }]);
    };

    // ❌ ลบ Bubble
    const removeFlexBubble = (index) => {
        setFlexMessages(flexMessages.filter((_, i) => i !== index));
    };

    // ✅ เพิ่ม Element ใน Bubble
    const addContentToBubble = (index, contentType) => {
        setFlexMessages((prev) => {
            const newFlexMessages = [...prev];

            if (contentType === "text") {
                newFlexMessages[index].contents.push({ type: "text", text: "ข้อความใหม่", size: "md" });
            }
            if (contentType === "image") {
                newFlexMessages[index].contents.push({ type: "image", url: "https://via.placeholder.com/300", size: "full" });
            }
            if (contentType === "button") {
                newFlexMessages[index].contents.push({
                    type: "button",
                    action: {
                        type: "uri",
                        label: "🔗 ไปยังเว็บ",
                        uri: "https://example.com"
                    },
                    style: "primary",
                    color: "#1DB446"
                });
            }

            return newFlexMessages;
        });
    };


    // ✅ แก้ไขข้อความใน Flex Message
    const updateFlexContent = (bubbleIndex, contentIndex, key, value) => {
        setFlexMessages((prev) => {
            const newFlexMessages = [...prev];

            const content = newFlexMessages[bubbleIndex].contents[contentIndex];

            if (content.type === "image" && key === "url") {
                content.url = value; // ✅ อัปเดต URL รูป
            } else if (content.type === "button" && key.startsWith("action.")) {
                // ✅ อัปเดตค่าของปุ่ม (button)
                const actionKey = key.replace("action.", ""); // เอา "action." ออก
                content.action[actionKey] = value;
            } else {
                content[key] = value; // ✅ อัปเดตค่าอื่นๆ เช่น `text`
            }

            return [...newFlexMessages]; // ✅ สร้าง State ใหม่เพื่อให้ React Re-render
        });
    };




    const handleSend = async () => {
        const payload = {
            sendType,
            userId: sendType === "single" ? userId : undefined,
            messageType,
            messageContent: messageType === "text" ? messageContent : undefined,
            mediaUrl: ["image", "video"].includes(messageType) ? mediaUrl : undefined,
            stickerPackageId: messageType === "sticker" ? selectedSticker.packageId : undefined,
            stickerId: messageType === "sticker" ? selectedSticker.stickerId : undefined,
            flexMessage: messageType === "flex" ? generateFlexMessage() : undefined,
        };

        console.log("📤 Payload:", payload);

        try {
            // const res = await fetch("/api/sendLineMessage", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(payload),
            // });
            // const result = await res.json();
            const result = await sendLineMessage(payload);

            // if (res.ok) {
            if (!result.error) {
                Swal.fire("✅ Success", "ส่งข้อความสำเร็จ!", "success");
            } else {
                Swal.fire("❌ Failed", result.message, "error");
            }
        } catch (error) {
            Swal.fire("❌ Error", "เกิดข้อผิดพลาดในการส่งข้อความ", "error");
            console.error("Error sending message:", error);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-black">
            <h2 className="text-2xl font-bold text-center mb-4">📲 ส่งข้อความไปยัง LINE OA</h2>

            {/* เลือกวิธีส่ง */}
            <select value={sendType} onChange={(e) => setSendType(e.target.value)} className="w-full border p-2 rounded mb-4">
                <option value="all">📢 ส่งให้ทุกคน</option>
                <option value="single">👤 ส่งให้บุคคล</option>
            </select>

            {sendType === "single" &&
                <>
                    <label
                        onClick={() => window.open("https://uat-h-series.telecorp.co.th/linelogin", "_blank")}
                        className="cursor-pointer border-b text-blue-500">
                        คลิกเพื่อดู LINE UID ของตัวเอง
                    </label>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className="w-full border p-2 rounded mb-4" placeholder="ป้อน LINE User ID" />
                </>
            }

            {/* เลือกประเภทข้อความ */}
            <select value={messageType} onChange={handleMessageTypeChange} className="w-full border p-2 rounded mb-4">
                <option value="text">✏️ ข้อความ</option>
                <option value="image">🖼️ รูปภาพ (ใช้ URL)</option>
                <option value="video">🎥 วิดีโอ (ใช้ URL)</option>
                <option value="sticker">🎭 สติ๊กเกอร์</option>
                <option value="flex">🎨 Flex Message (UI Builder)</option>
            </select>

            {messageType === "text" && <textarea value={messageContent} onChange={(e) => setMessageContent(e.target.value)} className="w-full border p-2 rounded mb-4" placeholder="พิมพ์ข้อความที่ต้องการส่ง..." />}

            {(messageType === "image" || messageType === "video") && <input type="text" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} className="w-full border p-2 rounded mb-4" placeholder="ใส่ URL ของไฟล์..." />}

            {messageType === "sticker" && (
                <>
                    <label className="block text-gray-700 font-bold mb-2">เลือกสติ๊กเกอร์</label>
                    <select onChange={handleStickerChange} className="w-full border p-2 rounded mb-4">
                        <option value="">-- เลือกสติ๊กเกอร์ --</option>
                        {stickerList.map((sticker, index) => (
                            <option key={index} value={`${sticker.packageId}-${sticker.stickerId}`}>
                                {sticker.description}
                            </option>
                        ))}
                    </select>
                    <input type="hidden" value={selectedSticker.packageId} />
                    <input type="hidden" value={selectedSticker.stickerId} />
                </>
            )}


            {messageType === "flex" ?
                <>
                    {flexMessages.map((bubble, index) => (
                        <div key={index} className="p-4 border rounded bg-gray-50 mb-4">
                            <p className="font-bold">Bubble {index + 1}</p>
                            {bubble.contents.map((content, idx) => (
                                <div key={idx} className="mb-2">
                                    {content.type === "text" && (
                                        <input
                                            type="text"
                                            value={content.text}
                                            onChange={(e) => updateFlexContent(index, idx, "text", e.target.value)}
                                            className="w-full border p-2 rounded mb-2"
                                        />
                                    )}
                                    {content.type === "image" && (
                                        <input
                                            type="text"
                                            value={content.url}
                                            onChange={(e) => updateFlexContent(index, idx, "url", e.target.value)}
                                            className="w-full border p-2 rounded mb-2"
                                            placeholder="ใส่ URL ของรูปภาพ..."
                                        />
                                    )}
                                    {content.type === "button" && (
                                        <>
                                            <input
                                                type="text"
                                                value={content.action.label}
                                                onChange={(e) => updateFlexContent(index, idx, "action.label", e.target.value)}
                                                className="w-full border p-2 rounded mb-2"
                                                placeholder="ข้อความบนปุ่ม"
                                            />
                                            <input
                                                type="text"
                                                value={content.action.uri}
                                                onChange={(e) => updateFlexContent(index, idx, "action.uri", e.target.value)}
                                                className="w-full border p-2 rounded mb-2"
                                                placeholder="ลิงก์เมื่อกดปุ่ม"
                                            />
                                        </>
                                    )}
                                </div>
                            ))}
                            <button onClick={() => addContentToBubble(index, "text")}>➕ เพิ่มข้อความ</button>
                            <button onClick={() => addContentToBubble(index, "image")}>🖼️ เพิ่มรูปภาพ</button>
                            <button onClick={() => addContentToBubble(index, "button")}>🔘 เพิ่มปุ่ม</button>
                            <button onClick={() => removeFlexBubble(index)}>❌ ลบ Bubble</button>
                        </div>
                    ))}
                    <button onClick={addFlexBubble}>➕ เพิ่ม Bubble</button>
                </>
                : ""}

            <button onClick={handleSend} className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">🚀 ส่งข้อความ</button>
        </div>
    );
}
