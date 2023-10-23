import { RecommendedTopic } from "./Topics"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Topic = ({name, icon}: RecommendedTopic) => {
  return (
    <Card className="w-[150px] cursor-pointer">
      <CardContent>
        <h2>{name}</h2>
        {icon}
      </CardContent>
    </Card>
  );
}

export default Topic