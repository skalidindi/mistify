import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const sigma = parseInt(formData.get("sigma") as string, 10);

  try {
    const buffer = await file.arrayBuffer();
    const { info, data } = await sharp(Buffer.from(buffer))
      .blur(sigma)
      .toBuffer({ resolveWithObject: true });

    const base64Image = `data:image/${info.format};base64,${data.toString(
      "base64"
    )}`;

    return NextResponse.json({ base64Image });
  } catch {
    return NextResponse.json(
      { error: "Image processing failed" },
      { status: 500 }
    );
  }
}
