import { Button } from "./ui/button";
import { Card } from "./ui/card";

type Props = {
  answer: string;
  letter: string;
};

const Answer = ({ answer, letter }: Props) => {
  return (
    <Button className="w-[500px]">
      <Card>{letter}</Card>
      {answer}
    </Button>
  );
};

export default Answer;
