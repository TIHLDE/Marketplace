import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import hasAccess, { isLoggedIn } from "../middleware/auth";
import { adminRoles } from "@/app/enums/role";
import uploadFile from "../azure/fileUpload";
import prisma from "@/prisma/client";


export const POST = async (request: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!isLoggedIn(session)) {
        return NextResponse.json({ message: "Du er ikke innlogget." }, { status: 401 });
    }

    if (!hasAccess(session!.role, adminRoles)) {
        return NextResponse.json({ message: "Du har ikke tilgang til å laste opp en fil." }, { status: 403 });
    }

    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
        return NextResponse.json({ message: "Du må velge en fil." }, { status: 400 });
    }

    try {
        const uploadURL = await uploadFile(file);
        const image = await prisma.image.create({
            data: {
                url: uploadURL
            }
        });

        return NextResponse.json(image, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: "Noe gikk galt under opplastingen av filen." }, { status: 500 });
    }
};

export const GET = async (request: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!isLoggedIn(session)) {
        return NextResponse.json({ message: "Du er ikke innlogget." }, { status: 401 });
    }

    if (!hasAccess(session!.role, adminRoles)) {
        return NextResponse.json({ message: "Du har ikke tilgang til å se filer." }, { status: 403 });
    }

    const url = new URL(request.url);
    const skip = Number(url.searchParams.get("skip"));
    const take = Number(url.searchParams.get("take"));

    if (isNaN(skip) || isNaN(take)) {
        return NextResponse.json({ message: "Ugyldige parametere." }, { status: 400 });
    }

    const count = await prisma.image.count();
    const images = await prisma.image.findMany({
        skip: (skip - 1) * take,
        take: take
    });

    return NextResponse.json({ count, images }, { status: 200 });
};