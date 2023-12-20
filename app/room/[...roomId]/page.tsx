"use client"
import { Location } from "@/components/Location/Location";
import { Chatbox } from "@/components/Chatbox/Chatbox";
import { SubmissionDialog } from "@/components/SubmissionDialog/SubmissionDialog";
import React, { useState, useEffect } from 'react';
import { Room, getRoomDetail } from "@/lib/roomService";
import {
    StompSessionProvider
} from "react-stomp-hooks";
import { useRouter } from 'next/navigation'
import { ShareDialog } from "@/components/ShareDialog/ShareDialog";


export default function Home({ params }: { params: { roomId: string } }) {
    const router = useRouter();
    const [room, setRoom] = useState<Room>({} as Room);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRoomDetail({ roomId: params.roomId });
                setRoom(await response.json() as Room);
            } catch (error) {
                //redirect to /rooms listing page
                router.push("/rooms");
            }
        };
        fetchData();
    }, [params.roomId]);

    return (
        <StompSessionProvider
            url={"http://localhost:9090/sock"}
        >
            <main className="flex flex-col justify-between p-6 space-y-6">
                <Location roomId={params.roomId} roomData={room} />
                <div className="flex justify-end">
                    <SubmissionDialog roomId={params.roomId} />
                    <ShareDialog />
                </div>
                <Chatbox roomId={params.roomId} />
            </main>


        </StompSessionProvider>
    )
}