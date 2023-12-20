"use client"
import { useEffect, useState } from "react"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { getRoomDetail } from "@/lib/roomService"

type locationData = { id: string, name: string, description: string, reason: string, image: string };

export const Location = ({ roomId }: { roomId: string }) => {

    const [locations, setLocations] = useState<locationData[]>([]);

    const mapfor5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (<>
        {/* show card with the screen width */}
        <Card className="w-full h-[400px] p-6 bg-white shadow-lg rounded-lg">

            <CardHeader>
                <CardTitle>Lunch gogogo</CardTitle>
                <CardDescription>By: hhehehehe</CardDescription>
            </CardHeader>
            <CardContent className="space-x-4 p-4 border-y">

                {locations.length === 0 ? (
                    // Centered message if no locations
                    <div className="flex justify-center items-center h-64">No submissions yet.</div>
                ) : (
                    <div className="flex overflow-x-auto scrollbar-hide space-x-4 p-4 lg:p-6">
                        {locations.map((item) => (
                            <Card key={item.id} className="min-w-[250px]">
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4 border-y py-4">
                                    <img
                                        alt="Card 4 image"
                                        className="object-cover w-full h-30"
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
                                    {item.description}
                                    <br />
                                    {item.reason}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                )}

            </CardContent>
        </Card>
    </>
    )
}