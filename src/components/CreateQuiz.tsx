"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const CreateQuiz = () => {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Create a Quiz</CardTitle>
        <CardDescription>Are you ready to be challenged?</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div>
            <div>
              <Label htmlFor="topic">Topic</Label>
              <Input type="text" id="topic" placeholder="Enter a Topic" />
              <CardDescription>
                Provide a topic you'd like to have a quiz about
              </CardDescription>
            </div>
            <div>
              <Label htmlFor="number">Number of Questions</Label>
              <Input
                id="number"
                type="number"
                placeholder="How many Questions?"
              />
              <CardDescription>
                Choose the number of quiz questions you want
              </CardDescription>
            </div>
            <Button>Create</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CreateQuiz;
