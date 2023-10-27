import { Button } from "./ui/button";
import { Card } from "./ui/card";

type Props = {
  answer: string;
  number: number;
};

const Answer = ({ answer, number }: Props) => {
  return (
    <Button className="w-[500px]">
      <Card>{number}</Card>
      {answer}
    </Button>
  );
};

export default Answer;
