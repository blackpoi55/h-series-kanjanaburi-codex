export async function POST(req) {
  try {
    const {
      sendType,
      userId,
      messageType,
      messageContent,
      mediaUrl,
      stickerPackageId,
      stickerId,
      flexMessage
    } = await req.json();

    const CHANNEL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN;

    if (!CHANNEL_ACCESS_TOKEN) {
      return new Response(JSON.stringify({ message: "Missing Access Token" }), { status: 500 });
    }

    let body = {};
    let apiUrl = "";

    // ✅ กำหนดโครงสร้างของ messages ตามประเภทข้อความ
    let messages = [];

    if (messageType === "text" && messageContent) {
      messages.push({ type: "text", text: messageContent });
    } else if (messageType === "image" && mediaUrl) {
      messages.push({ type: "image", originalContentUrl: mediaUrl, previewImageUrl: mediaUrl });
    } else if (messageType === "video" && mediaUrl) {
      messages.push({ type: "video", originalContentUrl: mediaUrl, previewImageUrl: mediaUrl });
    } else if (messageType === "sticker" && stickerPackageId && stickerId) {
      messages.push({ type: "sticker", packageId: stickerPackageId, stickerId: stickerId });
    } else if (messageType === "flex" && flexMessage) {
      messages.push({ type: "flex", altText: "Flex Message", contents: JSON.parse(flexMessage) });
    } else {
      return new Response(JSON.stringify({ message: "Invalid Message Type or Missing Data" }), { status: 400 });
    }

    if (sendType === "all") {
      apiUrl = "https://api.line.me/v2/bot/message/broadcast";
      body = { messages };
    } else if (sendType === "single" && userId) {
      apiUrl = "https://api.line.me/v2/bot/message/push";
      body = { to: userId, messages };
    } else {
      return new Response(JSON.stringify({ message: "Invalid Request" }), { status: 400 });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.statusText}, ${errorText}`);
    }

    return new Response(JSON.stringify({ message: "Message sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return new Response(JSON.stringify({ message: "Failed to send message", error: error.message }), { status: 500 });
  }
}
