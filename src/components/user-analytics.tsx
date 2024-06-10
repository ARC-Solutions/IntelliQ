import { Bar, ComposedChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: any }[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{label}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You played that: {payload[0].value} times</p>
                </CardContent>
            </Card>
        );
    }

    return null;
};

const UserAnalytics = ({ data }: { data: string[] }) => {
    return (
        <>
            <CardContent>
                <ComposedChart
                    layout='vertical'
                    width={500}
                    height={398}
                    data={data}
                    margin={{
                        top: 20,
                        left: 35,
                    }}
                >
                    <XAxis type='number' style={{ fontWeight: 600 }} />
                    <YAxis dataKey='name' type='category' style={{ fontWeight: 600 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey='topic_frequency' barSize={20} fill='#c8b6ff' />
                    <Line type='monotone' dataKey='topic_frequency' stroke='#ffffff' />
                </ComposedChart>
            </CardContent>
        </>
    );
};

export default UserAnalytics;
