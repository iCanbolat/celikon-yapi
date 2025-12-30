import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook secret
    const secret = request.headers.get("x-contentful-webhook-secret");

    if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = await request.json();

    // Get the content type and sys info from Contentful webhook payload
    const contentType = body.sys?.contentType?.sys?.id;
    const entryId = body.sys?.id;
    const locale = body.sys?.locale || "tr-TR";

    // Map Contentful locale to our app locale
    const appLocale = locale === "tr-TR" ? "tr" : "en";

    console.log(
      `Revalidating: contentType=${contentType}, entryId=${entryId}, locale=${appLocale}`
    );

    // Revalidate based on content type
    if (contentType === "project") {
      // Get the slug from the fields if available
      const slug =
        body.fields?.slug?.[locale] ||
        body.fields?.slug?.["tr-TR"] ||
        body.fields?.slug?.["en-US"];

      // Revalidate project pages
      revalidatePath("/tr/projects", "page");
      revalidatePath("/en/projects", "page");

      // Revalidate home page (for featured projects)
      revalidatePath("/tr", "page");
      revalidatePath("/en", "page");

      // Revalidate specific project page if slug is available
      if (slug) {
        revalidatePath(`/tr/projects/${slug}`, "page");
        revalidatePath(`/en/projects/${slug}`, "page");
      }
    }

    return NextResponse.json({
      revalidated: true,
      message: "Revalidation triggered successfully",
      contentType,
      entryId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);

    return NextResponse.json(
      {
        message: "Error revalidating",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support GET for manual revalidation with query params
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString(),
      });
    }

    // Revalidate all main pages if no specific path
    revalidatePath("/tr", "page");
    revalidatePath("/en", "page");
    revalidatePath("/tr/projects", "page");
    revalidatePath("/en/projects", "page");
    revalidatePath("/tr/services", "page");
    revalidatePath("/en/services", "page");
    revalidatePath("/tr/about", "page");
    revalidatePath("/en/about", "page");

    return NextResponse.json({
      revalidated: true,
      message: "All pages revalidated",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);

    return NextResponse.json(
      {
        message: "Error revalidating",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
