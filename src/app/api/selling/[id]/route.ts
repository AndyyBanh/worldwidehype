import { deleteInquiry, getInquiryById, updateInquiryStatus } from "@/lib/api/inquiries";
import { requireAdminSession } from "@/lib/api/auth";
import { INQUIRY_STATUSES, InquiryStatus } from "@/types/inquiry";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorized = await requireAdminSession();
    if (unauthorized) return unauthorized;

    const { data, error } = await getInquiryById((await params).id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorized = await requireAdminSession();
    if (unauthorized) return unauthorized;

    const body: { status?: string } = await request.json();

    if (!body.status || !INQUIRY_STATUSES.includes(body.status as InquiryStatus)) {
        return NextResponse.json(
            { error: "Invalid status" },
            { status: 400 }
        );
    }

    const { error } = await updateInquiryStatus((await params).id, body.status as InquiryStatus);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorized = await requireAdminSession();
    if (unauthorized) return unauthorized;

    const { error } = await deleteInquiry((await params).id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
