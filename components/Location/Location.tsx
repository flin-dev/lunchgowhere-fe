"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { getRoomDetail } from "@/lib/roomService"


export const Location = ({ roomId }: { roomId: string }) => {

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRoomDetail({ roomId });
            console.log(data);
        };
        fetchData();
    }, []);

    const mapfor5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (<>
        {/* show card with the screen width */}
        <Card className="w-full p-6 bg-white shadow-lg rounded-lg">

            <CardHeader>
                <CardTitle>Featured Content</CardTitle>
                <CardDescription>Scroll to view more</CardDescription>
            </CardHeader>
            <CardContent className="space-x-4 p-4 border-y">
                <div className="flex overflow-x-auto scrollbar-hide space-x-4 p-4 lg:p-6">
                    {mapfor5.map((item) => (
                        <Card className="min-w-[250px]">
                            <CardHeader>
                                <CardTitle>Location Name</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 border-y py-4">
                                <img
                                    alt="Card 4 image"
                                    className="object-cover w-full h-60"
                                    height="300"
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: "300/300",
                                        objectFit: "cover",
                                    }}
                                    width="300"
                                />

                            </CardContent>
                            <CardFooter className="bg-gray-100 py-4 dark:bg-gray-800">
                                Description here here here
                                <br />
                                Reason goes here
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    </>
    )
}

function ShareIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
    )
}