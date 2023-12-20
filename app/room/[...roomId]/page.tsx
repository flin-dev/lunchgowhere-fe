"use client"
import { Location } from "@/components/Location/Location";
import { Listing } from "@/components/Listing/Listing";
import { SubmissionDialog } from "@/components/SubmissionDialog/SubmissionDialog";
import React, { useState, useEffect } from 'react';
import { getRoomDetail } from "@/lib/roomService";
import {
    StompSessionProvider
} from "react-stomp-hooks";
import { redirect } from 'next/navigation'


export default function Home({ params }: { params: { roomId: string } }) {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRoomDetail({ roomId: params.roomId });
                if (data) {
                    // console.log(data);
                    redirect("/rooms");
                }

            } catch (error) {
                //redirect to /rooms listing page
                redirect("/rooms");
            }
        };
        fetchData();
    }, []);

    return (
        <StompSessionProvider
            url={"http://localhost:9090/sock"}
        >
            <main className="p-6 space-y-6">
                <Location roomId={params.roomId} />
                <SubmissionDialog roomId={params.roomId} />
                <Listing roomId={params.roomId} />
            </main>


        </StompSessionProvider>
    )
}