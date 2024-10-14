import connectDB from "@/app/config/mongoose"
import { NextRequest, NextResponse } from "next/server";
import Post from "@/app/config/models/Post";


export async function GET(req: NextRequest, context: { params: { postId: string } }) {
    //await connectDB()

    try {
        const idPost = context.params.postId
        const detailPost = await Post.findById(idPost)
        if (detailPost) {
            return NextResponse.json({
                data: detailPost,
                message: "Get detail post success"
            }, { status: 201, statusText: "Get success" })
        }
        return NextResponse.json({
            data: null,
            message: "The post is not exist"
        }, { status: 400, statusText: "Get failed" })

    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({
            data: null,
            message: "Error"
        }, { status: 400, statusText: "Created error" })
    }
}
