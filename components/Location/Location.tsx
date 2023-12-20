"use client"
import { useEffect, useState } from "react"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { LocationSubmission, Room, getLocationSubmissions } from "@/lib/roomService"


export const Location = ({ roomId, roomData }: { roomId: string, roomData: Room }) => {

    const [locationSubmissions, setLocationSubmissions] = useState<LocationSubmission[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getLocationSubmissions({ roomId });

            const decodedResp = await resp.json();

            console.log(decodedResp);
            setLocationSubmissions(decodedResp as LocationSubmission[]);
        }

        fetchData();
    }, [roomId])

    return (<>
        {/* show card with the screen width */}
        <Card className="w-full p-6 bg-white shadow-lg rounded-lg">
            <CardHeader>
                <CardTitle>{roomData.name}</CardTitle>
                <CardDescription>By: {roomData.roomOwner?.username} On: {roomData.targetTime?.toString()} </CardDescription>
            </CardHeader>
            <CardContent className="space-x-4 p-4 border-y">

                {locationSubmissions === null || locationSubmissions?.length === 0 ? (
                    // Centered message if no locations
                    <div className="flex justify-center items-center h-64">No submissions yet.</div>
                ) : (
                    <div className="flex w-full overflow-x-auto scrollbar-hide space-x-4 p-4 lg:p-6">
                        {locationSubmissions && locationSubmissions.map((item: LocationSubmission) => (
                            <Card key={item.id} className="min-w-52 h-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4 border-y py-4">
                                    {/* <Image src="/placeholder.svg" /> */}
                                    <img
                                        src="/placeholder.svg"
                                        alt="Card 4 image"
                                        className="object-cover w-full h-30"
                                    />

                                </CardContent>
                                <CardFooter className="bg-gray-100 py-4 dark:bg-gray-800">
                                    Desciption: {item.description}
                                    <br />
                                    Reason: {item.reason}
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