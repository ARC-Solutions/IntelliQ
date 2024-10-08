import { GiRaceCar } from 'react-icons/gi';
import { GiJasonMask } from 'react-icons/gi';
import { IoGameController } from 'react-icons/io5';
import { FaCss3Alt } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { RiMicroscopeFill } from 'react-icons/ri';
import Topic from './topic';
export interface RecommendedTopic {
    name: string;
    icon: React.ReactElement;
}

const Topics = () => {
    const topics: Array<RecommendedTopic> = [
        { name: 'Formula One', icon: <GiRaceCar /> },
        { name: 'Anime', icon: <GiJasonMask /> },
        { name: 'Gaming', icon: <IoGameController /> },
        { name: 'CSS', icon: <FaCss3Alt /> },
        { name: 'JavaScript', icon: <SiJavascript /> },
        { name: 'Agile Management', icon: <RiMicroscopeFill /> },
    ];
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {topics.map((topic, i) => {
                return <Topic key={i} {...topic} />;
            })}
        </div>
    );
};

export default Topics;
