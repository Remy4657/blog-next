import connectDB from "@/app/config/mongoose"
import { NextRequest, NextResponse } from "next/server";
import Post from "@/app/config/models/Post";

export async function POST(req: NextRequest) {
    await connectDB()

    try {
        const { title, description } = await req.json()
        const existed = await Post.findOne({ title })
        console.log("existed: ", { existed })
        console.log(({ title, description }))
        if (!existed) {
            const newPost = await Post.create({ title, description })
            return NextResponse.json({
                data: newPost,
                message: "Success"
            }, { status: 201, statusText: "Created success" })
        }
        return NextResponse.json({
            data: null,
            message: "The title already"
        }, { status: 400, statusText: "Invalid" })

    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({
            data: null,
            message: "Error"
        }, { status: 400, statusText: "Created error" })
    }
}
export async function GET(req: NextRequest) {
    await connectDB()

    try {
        const limit = req.nextUrl.searchParams.get("limit") ?? 2
        const page = req.nextUrl.searchParams.get("page") ?? 1
        const totalPosts = await Post.countDocuments()
        const totalPage = Math.ceil(totalPosts / +limit)
        const allPost = await Post.find().skip((+page - 1) * +limit).limit(+limit)
        console.log({ limit, page })

        //const allPost = await Post.find()
        console.log("allPost: ", { allPost })

        return NextResponse.json({
            data: allPost,
            meta: {
                totalPage,
                totalCount: totalPosts
            },
            message: "Get all post success"
        }, { status: 201, statusText: "Get success" })

    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({
            data: null,
            message: "Error"
        }, { status: 400, statusText: "Created error" })
    }
}
