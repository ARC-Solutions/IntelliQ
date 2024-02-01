import {Card, CardContent} from "@/components/ui/card";
import {LuBrain, LuPuzzle} from "react-icons/lu";

const Features = () => {
    return (
        <section className="flex flex-col items-center justify-center px-8 py-16 space-y-8 bg-transparent"
                 id="features">
            <h2 className="text-4xl font-bold text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card
                    className='h-full w-full bg-purple-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-none'>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <LuBrain className="h-12 w-12"/>
                        <h3 className="text-2xl font-bold">AI Powered</h3>
                        <p className="text-center">
                            AI technology ensures that you get the most relevant quizzes based on your
                            interests.
                        </p>
                    </CardContent>
                </Card>
                <Card
                    className='h-full w-full bg-purple-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-none'>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <LuPuzzle className="h-12 w-12"/>
                        <h3 className="text-2xl font-bold">Custom Quizzes</h3>
                        <p className="text-center">Create your own quizzes and share them with your friends.</p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
};

export default Features;